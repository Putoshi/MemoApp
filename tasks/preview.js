import { preview } from 'vite';
import { viteConfig } from '../config/vite.config.js';
import fsExtra from 'fs-extra';
import path from 'path';

// ビルドバージョンを読み込み、プレビューのパスにあてる
const readBuildVersionFile = () => {
  const file = path.join(process.cwd(), 'dist/.build');
  return `${fsExtra.readFileSync(file, 'utf8')}/`;
};

(async () => {
  const buildVer = await readBuildVersionFile();
  viteConfig.build.outDir = path.join(process.cwd(), 'dist/', buildVer);
  await preview(viteConfig);
  console.log(`preview server started! Port: ${viteConfig.preview.port}`);
})();
