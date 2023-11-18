module.exports = {
  stories: ["../examples/**/*.stories.mdx", "../examples/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: ["../preset.js", "@storybook/addon-essentials"],
  framework: {
    name: "@storybook/vue3-vite",
    options: {}
  }
};