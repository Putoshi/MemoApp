import { createServer } from 'vite';
import { viteConfig } from '../config/vite.config.js';

(async () => {
  const server = await createServer(viteConfig);
  console.log(`local development server started! Port: ${viteConfig.server.port}`);
  await server.listen();
})();
