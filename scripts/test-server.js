const path = require('path')
const railn = require('../index')

railn.server(
  {
    projectRoot: path.resolve(__dirname, '../test'),
  },
  {
    port: 8081,
  }
)