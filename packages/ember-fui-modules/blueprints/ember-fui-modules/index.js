const path = require("path");
const debug = require("debug")(
  `ember-fui-modules:blueprints:${path.basename(__dirname)}`
);

module.exports = {
  normalizeEntityName() {},

  async beforeInstall() {
    try {
      await this.addPackageToProject("fomantic-ui-css");
    } catch (error) {
      debug("Could not add `fomantic-ui-css` package to project: %o", error);
    }
  },
};
