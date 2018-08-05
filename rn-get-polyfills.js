/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

'use strict';

module.exports = () => [
  require.resolve('./polyfills/Object.es6.js'),
  require.resolve('./polyfills/console.js'),
  require.resolve('./polyfills/error-guard.js'),
  require.resolve('./polyfills/Number.es6.js'),
  require.resolve('./polyfills/String.prototype.es6.js'),
  require.resolve('./polyfills/Array.prototype.es6.js'),
  require.resolve('./polyfills/Array.es6.js'),
  require.resolve('./polyfills/Object.es7.js'),
  require.resolve('./polyfills/babelHelpers.js'),
];
