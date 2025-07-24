module.exports = {
  stories: ["./../examples/**/*.mdx", "../examples/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: ["../preset.js", "@storybook/addon-docs"],
  framework: {
    name: "@storybook/vue3-vite",
    options: {},
  },
};
