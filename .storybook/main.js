module.exports = {
  core: {
    builder: 'webpack5',
  },
  stories: [
    "../**/**/*.stories.mdx",
    "../**/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  addons: ["../preset.js", "@storybook/addon-essentials"],
};
