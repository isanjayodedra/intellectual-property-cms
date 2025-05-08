require('dotenv').config();
const express = require('express');
const rateLimit = require('express-rate-limit');
const { createProxyMiddleware } = require('http-proxy-middleware');
const { errorConverter, errorHandler } = require('./middlewares/error');

const app = express();

//-------For Swager docs----------------
    const swaggerJsdoc = require('swagger-jsdoc');
    const swaggerUi = require('swagger-ui-express');
    const fs = require('fs');
    const path = require('path');
    const swaggerDefinition = require('./docs/swaggerDef');
    const options = {
    swaggerDefinition,
    apis: ['./src/route/*.js', './src/controllers/*.js'],
    };
    const swaggerSpec = swaggerJsdoc(options);
    // Serve generated swagger.json separately
    app.get('/swagger.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
    });
    // Serve the custom HTML for Swagger UI
    app.get('/docs', (req, res) => {
    res.sendFile(path.join(__dirname, './docs/swagger-template.html'));
    });
//-------For Swager docs----------------

//-------- for Health check----------
const healthCheckRoute = require('./route/healthCheck');
app.use('/', healthCheckRoute); // Attach route
//-------- for Health check----------

// Apply rate limiting to all requests
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    status: 429,
    message: "Too many requests, please try again later."
  }
});
app.use(limiter);

app.use(express.json());

// Health check
app.get('/health', (req, res) => res.json({ status: 'ok' }));

// Service proxies
const SERVICES = {
  auth_service: process.env.AUTH_URL,
  common_service: process.env.COMMON_URL,
  queue_service: process.env.QUEUE_URL,
  articles_service: process.env.ARTICLE_URL
};

/* Object.entries(SERVICES).forEach(([key, url]) => {
  app.use(
    `/api/${key}`,
    createProxyMiddleware({
      target: url,
      changeOrigin: true,
      pathRewrite: { [`^/api/${key}`]: '' },
    })
  );
}); */

Object.entries(SERVICES).forEach(([key, url]) => {
  app.use(
    `/${key}`,
    createProxyMiddleware({
      target: url,
      changeOrigin: true,
      pathRewrite: { [`^/${key}`]: '' },
    })
  );
});

// Convert any thrown Error into ApiError
app.use(errorConverter);

// Final error handler that formats response and logs
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`gateway running on port ${PORT}`));
