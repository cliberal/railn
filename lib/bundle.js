'use strict';

const log = require('../local-cli/util/log').out('bundle');
const Server = require('metro/src/Server');

const outputBundle = require('metro/src/shared/output/bundle');
const path = require('path');
const saveAssets = require('../local-cli/bundle/saveAssets');

const getConfig = require('./config')

async function buildBundle(
  option,
  customConfig,
  output = outputBundle,
) {
  // customReactNativeTransformer obtain babel config from env
  process.env.__metro_babel_config = JSON.stringify(customConfig.metroBabelConfig)
  
  // This is used by a bazillion of npm modules we don't control so we don't
  // have other choice than defining it as an env variable here.
  process.env.NODE_ENV = option.dev ? 'development' : 'production';
  const config = await getConfig(customConfig);
  
  let sourceMapUrl = option.sourcemapOutput;
  if (sourceMapUrl && !option.sourcemapUseAbsolutePath) {
    sourceMapUrl = path.basename(sourceMapUrl);
  }

  config.transformModulePath = option.transformer
    ? path.resolve(option.transformer)
    : config.transformModulePath;

  const requestOpts = {
    entryFile: option.entryFile,
    sourceMapUrl,
    dev: option.dev,
    minify: option.minify !== undefined ? option.minify : !option.dev,
    platform: option.platform,
  };

  const server = new Server(config);

  try {
    const bundle = await output.build(server, requestOpts);

    await output.save(bundle, option, log);

    // Save the assets of the bundle
    const outputAssets = await server.getAssets({
      ...Server.DEFAULT_BUNDLE_OPTIONS,
      ...requestOpts,
      bundleType: 'todo',
    });

    // When we're done saving bundle output and the assets, we're done.
    return await saveAssets(outputAssets, option.platform, option.assetsDest);
  } finally {
    server.end();
  }
}

module.exports = buildBundle;