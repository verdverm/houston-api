module.exports = async () => {
  // Allow edits to the config object in tests.
  process.env.ALLOW_CONFIG_MUTATIONS = "y";
};
