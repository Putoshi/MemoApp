import { createServer, build } from 'vite';
import react from '@vitejs/plugin-react';
import opener from 'opener';

import { getConfig } from '../config/index.js';

(async () => {

  // GET BUILD CONFIGS
  const config = getConfig(process.env.MODE);

  console.log(config.APP_CONFIG);
  
  const server = await build({
    configFile: false,
    root    : './src/',           // プロジェクトのルートディレクトリ
    base    : '',                 // 開発環境または本番環境で配信される際のベースとなるパブリックパス
    mode    : config.env,      // ENVIRONMENT
    build: {
      outDir: '../dist/',
      assetsDir: './assets/',
      minify: true,
      emptyOutDir: true,
      reportCompressedSize: true, // gzip 圧縮されたサイズレポートを有効/無効
      sourcemap: false
    },
    plugins : [react()],
    server: {
      port: config.PORT,
    },
    define: (()=>{
      const _globalDefine = {};
      Object.keys(config.APP_CONFIG).map((key) => {
        _globalDefine[key] = JSON.stringify(config.APP_CONFIG[key]);
      });
      return _globalDefine;
    })()

  });

  console.log(`local development server started! Port: ${config.PORT}`);
})();