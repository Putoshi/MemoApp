import react from '@vitejs/plugin-react';
import path from 'path';
import {getConfig} from './index.js';
import Datetime from '../tasks/libs/Datetime.js';


// GET BUILD CONFIGS
const config = getConfig(process.env.MODE);
console.log(config.APP_CONFIG);


// ビルド時の書き出しパス
export const outDir = path.join(process.cwd(), 'dist/', new Datetime(new Date()).toString(Datetime.DIR_NAME));

// アセットパスをリビジョンバージョンにする
export const assetsDir = path.join('./', process.env.npm_package_config_revision);

export const viteConfig = {
  configFile: false,
  root: 'src/',           // プロジェクトのルートディレクトリ
  base: '',                 // 開発環境または本番環境で配信される際のベースとなるパブリックパス
  mode: config.env,         // ENVIRONMENT
  server: {
    port: config.PORT,
    open: true
  },
  preview: {
    port: config.PORT,
    open: true
  },
  build: {
    outDir,
    assetsDir,
    minify: true,
    emptyOutDir: true,
    reportCompressedSize: true, // gzip 圧縮されたサイズレポートを有効/無効
    sourcemap: false
  },
  plugins: [react()],
  define: (() => {
    const _globalDefine = {};
    Object.keys(config.APP_CONFIG).map((key) => {
      _globalDefine[key] = JSON.stringify(config.APP_CONFIG[key]);
    });
    return _globalDefine;
  })()
}