function setup(entry = []) {
  return [...entry, new URL('./dist/esm/preset', import.meta.url).pathname];
}

export { setup };
