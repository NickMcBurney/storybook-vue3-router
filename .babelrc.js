module.exports = {
  presets: [
    "@babel/preset-env",
    "@babel/preset-typescript"
  ],
  env: {
    esm: {
      presets: [
        [
          "@babel/preset-env",
          {
            modules: false,
          },
        ],
      ],
    },
  },
};
