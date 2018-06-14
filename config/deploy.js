/* eslint-env node */

let credentials;

try {
  // eslint-disable-next-line node/no-missing-require
  credentials = require('./credentials.json');
} catch (e) {
  credentials = {};
}

module.exports = function(deployTarget) {
  var ENV = {
    build: {
      environment: "production"
    },
    pipeline: {
      alias: {
        s3: { as: ['s3-standard', 's3-xml'] },
      },
      activateOnDeploy: true
    },
    "revision-data": {
      "type": "version-commit"
    },
    's3-standard': {
      filePattern: '**/*.{js,css,png,gif,ico,jpg,map,txt,svg,swf,eot,ttf,woff,woff2,otf,wasm,json,html}',
      cacheControl: 'max-age=3600, public',
    },
    's3-xml': {
      filePattern: '**/*.xml',
      cacheControl: 'no-cache, no-store, must-revalidate',
      expires: 0,
      manifestPath: null,
    },
    's3-index': {
      allowOverwrite: true
    },
  };

  if (deployTarget === 'production') {

    const bucket = 'ember-ghost-casper-template';
    const region = 'eu-west-1'

    const keys = ['s3-standard', 's3-xml', 's3-index'];

    keys.forEach((envKey) => {
      ENV[envKey].accessKeyId = credentials.key || process.env.AWS_KEY;
      ENV[envKey].secretAccessKey = credentials.secret || process.env.AWS_SECRET;
      ENV[envKey].bucket = bucket;
      ENV[envKey].region = region;
    });
  }

  // Note: if you need to build some configuration asynchronously, you can return
  // a promise that resolves with the ENV object instead of returning the
  // ENV object synchronously.
  return ENV;
};
