require('./setupBabel')();
require('graceful-fs').gracefulify(require('fs'));

const bundle = require('./lib/bundle')
const server = require('./lib/server')

module.exports = {
  bundle,
  server,
}