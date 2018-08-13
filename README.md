# Railn

> Rail for metro  
> this is a fork from the cli folder of official react native library but use the latest metro(>=0.43.5)

## Install

```shell
npm install railn --dev
```

## Usage

the same with react-native
```shell
npx railn start

npx railn bundle --minify true --platform android --dev false --config metro.config.js --entry-file index.js --bundle-output build/index.android.bundle --sourcemap-output index.android.map.js
```

the most useful feature is custom metro config

## TODO

- [ ] integration with bundle splitting
