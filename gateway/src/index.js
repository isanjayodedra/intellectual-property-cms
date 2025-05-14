require('dotenv').config();
const express = require('express');
const rateLimit = require('express-rate-limit');
const { createProxyMiddleware } = require('http-proxy-middleware');
const { errorConverter, errorHandler } = require('./middlewares/error');
const swaggerJsdoc = require('swagger-jsdoc');
const path = require('path');
const swaggerDefinition = require('./docs/swaggerDef');
const qs = require('querystring');

const app = express();

// ✅ Body parsers
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// ✅ Logger (Optional for debugging)
app.use((req, res, next) => {
  console.log(`➡️ ${req.method} ${req.originalUrl}`);
  next();
});

// ✅ Swagger Docs
const swaggerOptions = {
  swaggerDefinition,
  apis: ['./src/route/*.js', './src/controllers/*.js'],
};
const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});
app.get('/docs', (req, res) => {
  res.sendFile(path.join(__dirname, './docs/swagger-template.html'));
});

// ✅ Rate Limiter
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: { status: 429, message: 'Too many requests' },
  })
);

// ✅ Health Check
app.get('/health', async (req, res) => {
  const fetch = (await import('node-fetch')).default;
  try {
    const [auth, articles] = await Promise.all([
      fetch('http://localhost:3001/healthz').then((r) => r.json()),
      fetch('http://localhost:3004/healthz').then((r) => r.json()),
    ]);
    res.json({
      gateway: 'UP',
      auth_service: auth,
      articles_service: articles,
    });
  } catch (err) {
    res.status(502).json({ error: 'One or more services unavailable' });
  }
});

// ✅ Serve uploads
const uploadsPath = path.resolve(__dirname, '../../uploads');
app.use('/uploads', express.static(uploadsPath));

// ✅ Proxy Config
const SERVICES = {
  auth_service: process.env.AUTH_URL,
  common_service: process.env.COMMON_URL,
  queue_service: process.env.QUEUE_URL,
  articles_service: process.env.ARTICLE_URL,
};

Object.entries(SERVICES).forEach(([key, url]) => {
  app.use(
    `/${key}`,
    createProxyMiddleware({
      target: url,
      changeOrigin: true,
      pathRewrite: { [`^/${key}`]: '' },
      onProxyReq: (proxyReq, req, res) => {
        if (!req.body || !['POST', 'PUT', 'PATCH'].includes(req.method)) return;

        const contentType = req.headers['content-type'];
        let bodyData;

        if (contentType.includes('application/json')) {
          bodyData = JSON.stringify(req.body);
        } else if (contentType.includes('application/x-www-form-urlencoded')) {
          bodyData = qs.stringify(req.body);
        }

        if (bodyData) {
          proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
          proxyReq.write(bodyData);
        }
      },
      onError: (err, req, res) => {
        console.error(`❌ Proxy error [${key}]:`, err.message);
        if (!res.headersSent) {
          res.status(502).json({ error: 'Proxy connection error' });
        }
      },
    })
  );
});

// ✅ Error Handlers
app.use(errorConverter);
app.use(errorHandler);

// ✅ Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Gateway running on port ${PORT}`);
});