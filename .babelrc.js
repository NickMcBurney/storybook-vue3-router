module.exports = {
  presets: [
    "@babel/preset-env",
    "@babel/preset-typescript"
  ],
  env: {
    esm: {
      presets: [
        "minify",
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
