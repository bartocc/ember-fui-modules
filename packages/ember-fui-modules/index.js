"use strict";

const name = require("./package").name;
const debug = require("debug")(name);

module.exports = {
  name,

  importFuiModule(moduleName, importCss, includer) {
    const modulesDir = "node_modules/fomantic-ui-css/components";
    const importedModule = `${modulesDir}/${moduleName}.js`;

    debug("importing %o for '%s'", importedModule, includer.name);
    this.import(importedModule);

    if (importCss) {
      let importedCss = `${modulesDir}/${moduleName}.css`;
      debug("importing %o for '%s'", importedCss, includer.name);
      this.import(importedCss);
    }
  },

  included(includer) {
    this._super.included.apply(this, includer);

    if (!includer.options.fuiModules) return;

    this.fuiModulesOptions = includer.options.fuiModules;
    this.fuiModulesOptions.only = this.fuiModulesOptions.only || [];

    // importCss defaults to true
    if (this.fuiModulesOptions.importCss === undefined)
      this.fuiModulesOptions.importCss = true;

    this.fuiModulesOptions.only.forEach((moduleName) => {
      this.importFuiModule(
        moduleName,
        this.fuiModulesOptions.importCss,
        includer
      );

      // modal.js requires dimmer.js
      if (
        !this.fuiModulesOptions.only.includes("dimmer") &&
        moduleName === "modal"
      ) {
        this.importFuiModule(
          "dimmer",
          this.fuiModulesOptions.importCss,
          includer
        );
      }

      // popup.js requires transition.js
      if (
        !this.fuiModulesOptions.only.includes("transition") &&
        moduleName === "popup"
      ) {
        this.importFuiModule(
          "transition",
          this.fuiModulesOptions.importCss,
          includer
        );
      }
    });
  },
};
