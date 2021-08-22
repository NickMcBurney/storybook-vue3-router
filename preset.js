function setup(entry = []) {
  return [...entry, require.resolve("./dist/esm/preset")];
}

module.exports = {
  setup
};
