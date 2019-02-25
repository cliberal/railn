const path = require('path')
const railn = require('../index')

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
