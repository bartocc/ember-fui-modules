"use strict";
const resolve = require("resolve");
const debug = require("debug")("ember-fui-modules");

module.exports = {
  name: require("./package").name,

  included(app) {
    this._super.included.apply(this, app);

    if (!app.options.lessOptions) app.options.lessOptions = {};
    if (!app.options.lessOptions.paths) app.options.lessOptions.paths = [];

    const accordionModulePath = "/definitions/modules/accordion.js";
    const res = resolve.sync(`fomantic-ui-less${accordionModulePath}`, {
      basedir: __dirname,
    });
    const fuiLessPath = res.replace(accordionModulePath, "");
    let appRoot;

    appRoot = app.project.isEmberCLIAddon()
      ? app.options.configPath.replace("/config/environment", "")
      : app.project.root;

    const addedPaths = [
      fuiLessPath,
      `${appRoot}/app/styles/fomantic`,
      `${appRoot}/app/styles/fomantic/dummy-path-to-import/theme.config`,
    ];

    debug("Adding the following paths to lessOptions: %o", addedPaths);
    app.options.lessOptions.paths = app.options.lessOptions.paths.concat(
      addedPaths
    );
  },
};
