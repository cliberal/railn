/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

'use strict'

const Metro = require('metro')

const { Terminal } = require('metro-core')

const messageSocket = require('../local-cli/server/util/messageSocket')
const morgan = require('morgan')
const path = require('path')
const webSocketProxy = require('../local-cli/server/util/webSocketProxy')
const MiddlewareManager = require('../local-cli/server/middleware/MiddlewareManager')

const getConfig = require('./config')

async function runServer(customConfig, option = {
  port: 8081,
  watchFolders: []
}) {
  // customReactNativeTransformer obtain babel config from env
  process.env.__metro_babel_config = JSON.stringify(customConfig.metroBabelConfig)

  const config = await getConfig(customConfig)
  const terminal = new Terminal(process.stdout)
  const ReporterImpl = getReporterImpl(option.customLogReporterPath || null)
  const reporter = new ReporterImpl(terminal)
  const middlewareManager = new MiddlewareManager(option)

  middlewareManager.getConnectInstance().use(morgan('combined'))

  config.watchFolders.forEach(middlewareManager.serveStatic)

  config.maxWorkers = option.maxWorkers
  config.server.port = option.port
  config.reporter = reporter
  config.server.enhanceMiddleware = middleware =>
    middlewareManager.getConnectInstance().use(middleware)

  // manual setting projectRoot, filename must be index.js
  // config.projectRoot = path.resolve(process.cwd(), option.projectRoot)

  const serverInstance = await Metro.runServer(config, {
    host: option.host,
    secure: option.https,
    secureCert: option.cert,
    secureKey: option.key,
    hmrEnabled: true,
  })

  const wsProxy = webSocketProxy.attachToServer(serverInstance, '/debugger-proxy')
  const ms = messageSocket.attachToServer(serverInstance, '/message')
  middlewareManager.attachDevToolsSocket(wsProxy)
  middlewareManager.attachDevToolsSocket(ms)

  // In Node 8, the default keep-alive for an HTTP connection is 5 seconds. In
  // early versions of Node 8, this was implemented in a buggy way which caused
  // some HTTP responses (like those containing large JS bundles) to be
  // terminated early.
  //
  // As a workaround, arbitrarily increase the keep-alive from 5 to 30 seconds,
  // which should be enough to send even the largest of JS bundles.
  //
  // For more info: https://github.com/nodejs/node/issues/13391
  //
  // $FlowFixMe (site=react_native_fb)
  serverInstance.keepAliveTimeout = 30000
}

function getReporterImpl(customLogReporterPath) {
  if (customLogReporterPath == null) {
    return require('metro/src/lib/TerminalReporter')
  }
  try {
    // First we let require resolve it, so we can require packages in node_modules
    // as expected. eg: require('my-package/reporter');
    /* $FlowFixMe: can't type dynamic require */
    return require(customLogReporterPath)
  } catch (e) {
    if (e.code !== 'MODULE_NOT_FOUND') {
      throw e
    }
    // If that doesn't work, then we next try relative to the cwd, eg:
    // require('./reporter');
    /* $FlowFixMe: can't type dynamic require */
    return require(path.resolve(customLogReporterPath))
  }
}

module.exports = runServer
