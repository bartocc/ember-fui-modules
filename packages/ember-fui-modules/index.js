"use strict";

const name = require("./package").name;
const debug = require("debug")(name);

module.exports = {
  name,

  included(includer) {
    this._super.included.apply(this, includer);

    if (!includer.options.fuiModules) return;

    this.fuiModulesOptions = includer.options.fuiModules;
    this.fuiModulesOptions.only = this.fuiModulesOptions.only || [];

    const modulesDir = "node_modules/fomantic-ui-css/components";

    this.fuiModulesOptions.only.forEach((e) => {
      let importedFile = `${modulesDir}/${e}.js`;
      debug(
        "importing fomantic-ui module '%s' for '%s' from %o",
        e,
        includer.name,
        importedFile
      );
      this.import(importedFile);

      // modal.js requires dimmer.js
      if (!this.fuiModulesOptions.only.includes("dimmer") && e === "modal") {
        importedFile = `${modulesDir}/dimmer.js`;
        debug(
          "importing fomantic-ui module '%s' for '%s' from %o",
          e,
          includer.name,
          importedFile
        );
        this.import(importedFile);
      }

      // popup.js requires transition.js
      if (
        !this.fuiModulesOptions.only.includes("transition") &&
        e === "popup"
      ) {
        importedFile = `${modulesDir}/transition.js`;
        debug(
          "importing fomantic-ui module '%s' for '%s' from %o",
          e,
          includer.name,
          importedFile
        );
        this.import(importedFile);
      }
    });
  },
};
