const path = require('path')
const railn = require('../index')

railn.bundle(
  {
    entryFile: path.resolve(__dirname, '../test/index.js'),
    dev: true,
    minify: false,
    platform: 'ios',
    bundleOutput: path.resolve(__dirname, '../test/index.jsbundle')
  },
  {
    projectRoot: path.resolve(__dirname, '../test'),
  }
)
