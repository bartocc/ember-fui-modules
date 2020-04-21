"use strict";

const name = require("./package").name;
const debug = require("debug")(name);

module.exports = {
  name,

  importCss: true,

  usedFomanticUIPackage(project) {
    const allDeps = Object.keys(project.pkg.devDependencies).concat(
      Object.keys(project.pkg.dependencies || {})
    );

    if (allDeps.includes("fomantic-ui-less")) return "fomantic-ui-less";
    if (allDeps.includes("fomantic-ui-css")) return "fomantic-ui-css";
    if (allDeps.includes("fomantic-ui")) return "fomantic-ui";

    throw "It looks like you application does not depend on any FUI package providing the modules files. Make sure you depend on either fomantic-ui, fomantic-ui-css or fomantic-ui-less if you want to use ember-fui-modules";
  },

  // The fomantic-ui and fomantic-ui-css packages distribute the module files under the directory `components` while fomantic-ui-less uses `definitions/modules`
  fomanticUIModulesDir(project) {
    const usedFomanticUIPackage = this.usedFomanticUIPackage(project);

    if (usedFomanticUIPackage === "fomantic-ui-less")
      return "node_modules/fomantic-ui-less/definitions/modules";

    if (["fomantic-ui-css", "fomantic-ui"].includes(usedFomanticUIPackage))
      return `node_modules/${usedFomanticUIPackage}/components`;

    throw "It looks like you application does not depend on any FUI package providing the modules files. Make sure you depend on either fomantic-ui, fomantic-ui-css or fomantic-ui-less if you want to use ember-fui-modules";
  },

  shouldImportCss(includer) {
    if (this.usedFomanticUIPackage(includer.project) === "fomantic-ui-less")
      return false;

    return this.importCss;
  },

  importFuiModule(moduleName, includer) {
    const modulesDir = this.fomanticUIModulesDir(includer.project);
    const importedModule = `${modulesDir}/${moduleName}.js`;

    debug("importing %o for '%s'", importedModule, includer.name);
    this.import(importedModule);

    if (this.shouldImportCss(includer)) {
      let importedCss = `${modulesDir}/${moduleName}.css`;
      debug("importing %o for '%s'", importedCss, includer.name);
      this.import(importedCss);
    }
  },

  included(includer) {
    this._super.included.apply(this, includer);

    const buildOptions = includer.options.fuiModules;
    if (!buildOptions) return;

    // by default, we do not import any module. Devs must be specific about what modules their app needs. This is to avoid the includer's bundle to be filled with unused JS
    let modulesToImport = new Set(buildOptions.only);

    // Some FUI modules depend on others to work
    if (modulesToImport.has("modal")) modulesToImport.add("dimmer");
    if (modulesToImport.has("popup")) modulesToImport.add("transition");

    modulesToImport.forEach((moduleName) => {
      this.importFuiModule(moduleName, includer);
    });
  },
};
