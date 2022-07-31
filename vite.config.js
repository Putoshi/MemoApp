import {defineConfig, loadEnv} from 'vite'
import react from '@vitejs/plugin-react'


export default defineConfig(({ command, mode }) => {
  // `mode` に基づいて現在の作業ディレクトリにある env ファイルをロードする
  // `VITE_` プレフィックスに関係なく全ての環境変数をロードするには、第 3 引数に '' を設定します
  const env = loadEnv(mode, process.cwd(), '')
  return {
    // vite の設定
    define: {
      __APP_ENV__: env.APP_ENV
    },
    root    : './src/',           // プロジェクトのルートディレクトリ
    base    : '',                 // 開発環境または本番環境で配信される際のベースとなるパブリックパス
    mode    : 'development',      // ENVIRONMENT
    build: {
      outDir: './dist/',
      assetsDir: './assets/',
      outDir: './dist/',
      minify: true,
      emptyOutDir: true,
      reportCompressedSize: true, // gzip 圧縮されたサイズレポートを有効/無効
      sourcemap: false
    },
    plugins : [react()]
  }
})
