module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  env: {
    production: {
      plugins: [],
    },
    development:{
      plugins: [],
    }
  },
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: [
          '.js',
          '.json',
        ],
        alias: {
          "_assets": "./src/Assets",
          "_components": "./src/Components",
          "_atoms": "./src/Components/Atoms",
          "_molecules": "./src/Components/Molecules",
          "_organisms": "./src/Components/Organisms",
          "_navigation": "./src/Navigation",
          "_screens": "./src/Screens",
          "_styles": "./src/Styles",
          "_utils": "./src/Utils",
          "_localization":"./src/Localization",
          // "_reducers" : './src/redux_/reducers',
          // "_actions" : './src/redux_/actions',
          "_store" : "./src/Store",
          // "_modals": "./src/modals"
        },
      },
    ]
  ]
};
