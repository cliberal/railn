const path = require('path')
const railn = require('../index')

railn.bundle(
  {
    projectRoot: '/Users/juchangrong/Workspace/douyin_rn/fe_app_rn',
    entryFile: '/Users/juchangrong/Workspace/douyin_rn/fe_app_rn/config/metro/index.js',
    dev: true,
    minify: false,
    platform: 'ios',
    bundleOutput: path.resolve(__dirname, '../test/index.jsbundle'),
    watchFolders: [
      '/Users/juchangrong/Workspace/douyin_rn/fe_app_rn',
      '/Users/juchangrong/Workspace/wheels/railn',
    ],
  },
  {
    projectRoot: '/Users/juchangrong/Workspace/douyin_rn/fe_app_rn',
  }
)
