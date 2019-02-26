const path = require('path')
const railn = require('../index')

global.__eden__ = {}
__eden__.metroBabelConfig = {
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

railn.server(
  {
    projectRoot: '/Users/juchangrong/Workspace/douyin_rn/fe_app_rn/config/metro',
    watchFolders: [
      '/Users/juchangrong/Workspace/douyin_rn/fe_app_rn',
      '/Users/juchangrong/Workspace/wheels/railn',
    ],
  },
  {
    port: 8081,
    watchFolders: ['/Users/juchangrong/Workspace/douyin_rn/fe_app_rn'],
  }
)
