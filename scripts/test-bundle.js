const path = require('path')
const railn = require('../index')

global.__eden__ = {}
global.__eden__.metroBabelConfig = {
  presets: [ 'module:metro-react-native-babel-preset' ],
  plugins: [
    ['@babel/plugin-syntax-dynamic-import'],
    [
      'module-resolver',
      {
        alias: {
          '^@src/(.+)': './src/\\1',
        },
        cwd: '/Users/juchangrong/Workspace/douyin_rn/fe_app_rn',
        extensions: ['.jsx', '.js', '.ios.jsx', '.ios.js', '.android.jsx', '.android.js'],
      },
    ],
  ],
}

railn.bundle(
  {
    entryFile: '/Users/juchangrong/Workspace/douyin_rn/fe_app_rn/config/metro/index.js',
    dev: true,
    minify: false,
    platform: 'ios',
    bundleOutput: path.resolve(__dirname, '../test/index.jsbundle'),
  },
  {
    projectRoot: '/Users/juchangrong/Workspace/douyin_rn/fe_app_rn',
    watchFolders: [
      '/Users/juchangrong/Workspace/douyin_rn/fe_app_rn',
      '/Users/juchangrong/Workspace/wheels/railn'
    ],
  }
)
