import cors from 'cors';
import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

const port = Number(process.env.PORT ?? 8080);
const backendOrigin = process.env.BACKEND_ORIGIN ?? 'https://www.piccolokids.com.ar';
const allowedOrigins = (process.env.ALLOWED_ORIGINS ?? 'http://localhost:3000')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

const app = express();

app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(express.json());

app.get('/health', (_request, response) => {
  response.json({
    ok: true,
    service: 'piccolo-api',
    backendOrigin,
    timestamp: new Date().toISOString()
  });
});

app.use(
  '/legacy',
  createProxyMiddleware({
    target: backendOrigin,
    changeOrigin: true,
    pathRewrite: { '^/legacy': '' }
  })
);

app.listen(port, () => {
  console.log(`Piccolo API listening on port ${port}`);
});
