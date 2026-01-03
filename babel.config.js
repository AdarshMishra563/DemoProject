module.exports = {
  presets: ['module:@react-native/babel-preset'],
   plugins: [
    [
      'module-resolver',
      {
        root:['./src'],
        alias: {
            '@assets': './src/assets',
            '@navigation': './src/navigation',
            '@redux': './src/redux',
            '@services': './src/services',
            '@styles': './src/styles',
            '@screens': './src/screens',
            '@components': './src/components',
            '@utils': './src/utils',
            '@api': './src/api',
        },
      },
    ],
  ],
};
