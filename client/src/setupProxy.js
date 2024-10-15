const { createProxyMiddleware } = require('http-proxy-middleware');
 
module.exports = function (app) {
  app.use(
    createProxyMiddleware('/api/user', {
      target: process.env.REACT_APP_ACCOUNT_URI, 
      changeOrigin: true,
      }
    )
  );
  app.use(
    createProxyMiddleware('/api/company', {
      target: process.env.REACT_APP_COMPANY_URI,
      changeOrigin: true,
      }
    )
  );
  app.use(
    createProxyMiddleware('/api/event', {
      target: process.env.REACT_APP_EVENT_URI,
      changeOrigin: true,
      }
    )
  );
  app.use(
    createProxyMiddleware('/api/finance', {
      target: process.env.REACT_APP_FINANCE_URI,
      changeOrigin: true,
      }
    )
  );
}