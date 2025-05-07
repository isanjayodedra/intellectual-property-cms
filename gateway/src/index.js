require('dotenv').config();
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const { errorConverter, errorHandler } = require('./middlewares/error');

const app = express();
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
