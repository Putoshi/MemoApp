import { build } from 'vite';
import { viteConfig, outDir } from '../config/vite.config.js';
import fsExtra from 'fs-extra';

// ビルドバージョンを記録しとく
const writeBuildVersionFile = () => {
  const parse = outDir.split('/');
  const dateStr = parse[parse.length - 1];

  // ビルドしたファイルパスを記録
  const file = outDir.replace(dateStr, '.build');
  fsExtra.outputFileSync(file, dateStr);

  const data = fsExtra.readFileSync(file, 'utf8');
  console.log(data);
};

(async () => {
  await writeBuildVersionFile();
  await build(viteConfig);
  console.log('Build Finished!');
})();


