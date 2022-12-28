module.exports = {
  stories: ["../**/**/*.stories.mdx", "../**/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: ["../preset.js", "@storybook/addon-essentials"],
  docs: {
    autodocs: true
  },
  framework: {
    name: "@storybook/vue3-webpack5",
    options: {}
  }
};