const path = require("path");
const debug = require("debug")(
  `ember-fui-modules:blueprints:${path.basename(__dirname)}`
);

module.exports = {
  normalizeEntityName() {},

  // Used to determine if the project already depends on a `fomantic-ui-*` package or if we need to add `fomantic-ui-css`.
  needsFomanticUI(project) {
    const fuiPackages = ["fomantic-ui", "fomantic-ui-css", "fomantic-ui-less"];

    // Intersect fuiPackages with project.pkg.devDependencies
    let intersection = Object.keys(project.pkg.devDependencies).filter((x) =>
      fuiPackages.includes(x)
    );

    // if the intersection is not empty, FUI is not needed
    if (intersection.length > 0) return false;

    // Intersect fuiPackages with project.pkg.dependencies
    intersection = Object.keys(project.pkg.dependencies || {}).filter((x) =>
      fuiPackages.includes(x)
    );

    // if the intersection is not empty, FUI is not needed
    if (intersection.length > 0) return false;

    return true;
  },

  async beforeInstall(options) {
    if (!this.needsFomanticUI(options.project)) return;

    try {
      await this.addPackageToProject("fomantic-ui-css");
    } catch (error) {
      debug("Could not add `fomantic-ui-css` package to project: %o", error);
    }
  },
};
