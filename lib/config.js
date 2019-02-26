const Config = require('../local-cli/util/Config')

const ASSET_REGISTRY_PATH = 'react-native/Libraries/Image/AssetRegistry'
const ASSET_SOURCE_RESOLVER_PATH = 'react-native/Libraries/Image/AssetSourceResolver'

const defaultConfig = {
  getPlatforms() {
    return ['ios', 'android', 'windows', 'web', 'dom']
  },
  getProvidesModuleNodeModules() {
    return ['react-native', 'react-native-windows', 'react-native-dom']
  },
}

async function getConfig(customConfig) {
  const config = await Config.merge(customConfig)
  config.transformer.assetRegistryPath = ASSET_REGISTRY_PATH
  config.resolver.platforms = defaultConfig.getPlatforms()
  config.resolver.providesModuleNodeModules = defaultConfig.getProvidesModuleNodeModules()
  config.transformModulePath = require.resolve('../local-cli/customReactNativeTransformer')
  return config
}

module.exports = getConfig
