import s3Deploy from 'simple-s3-deploy';
import credential from '../config/credential.json' assert {type: "json"};
import path from 'path';
import fsExtra from 'fs-extra';

// ビルドバージョンを読み込み
const readBuildVersionFile = () => {
  const file = path.join(process.cwd(), 'dist/.build');
  return `${fsExtra.readFileSync(file, 'utf8')}/`;
};

const buildVer = await readBuildVersionFile();
const distDir = path.join(process.cwd(), 'dist/', buildVer);

const S3Options = (process.env.TARGET === 's3') ? {
  ID: credential.s3[process.env.MODE].accessKeyId,
  SECRET: credential.s3[process.env.MODE].secretAccessKey,
  BUCKET_NAME: credential.s3[process.env.MODE].bucket,
  DEPLOY_FOLDER_PATH: distDir,
} : {};

const CFOptions = (process.env.CACHE === 'clear') ? {
  CACHE: {
    ID: credential.cloudfront[process.env.MODE].distributionId,
    QUANTITY: 1,
    PATH: ['/*'],
  }
} : {};


// デプロイメントオプション
let deployOptions = {};

if (process.env.TARGET === 's3') deployOptions = { ...deployOptions, ...S3Options };
if (process.env.CACHE === 'clear') deployOptions = { ...deployOptions, ...CFOptions };

console.log(deployOptions);

// Deploy
s3Deploy.deploy(deployOptions);
