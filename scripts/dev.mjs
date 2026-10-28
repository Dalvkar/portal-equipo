import { createServer } from 'node:http';
import { getAsset } from './files.mjs';
import './inventory.mjs';

const host = '127.0.0.1';
const port = 5173;
const securityHeaders = {
  'Content-Security-Policy': "default-src 'self'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'; object-src 'none'",
  'Referrer-Policy': 'no-referrer',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
};

createServer((request, response) => {
  const route = new URL(request.url, `http://${host}:${port}`).pathname;
  const asset = getAsset(route);
  if (!asset) {
    response.writeHead(404, securityHeaders).end('No encontrado');
    return;
  }
  response.writeHead(200, { ...securityHeaders, 'Content-Type': asset.contentType });
  response.end(asset.body);
}).listen(port, host, () => {
  console.log(`Portal disponible en http://${host}:${port}`);
});
