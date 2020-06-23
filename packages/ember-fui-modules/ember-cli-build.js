"use strict";

const EmberAddon = require("ember-cli/lib/broccoli/ember-addon");

module.exports = function (defaults) {
  let app = new EmberAddon(defaults, {
    fuiModules: {
      only: [
        "accordion",
        "calendar",
        "checkbox",
        "dropdown",
        "modal",
        "nag",
        "popup",
        "progress",
        "rating",
        "search",
        "shape",
        "sidebar",
        "slider",
        "sticky",
        "tab",
        "toast",
        "transition",
      ],
    },
  });

  /*
    This build file specifies the options for the dummy test app of this
    addon, located in `/tests/dummy`
    This build file does *not* influence how the addon or the app using it
    behave. You most likely want to be modifying `./index.js` or app's build file
  */

  // FUI globals
  app.import("node_modules/fomantic-ui-css/components/reset.css");
  app.import("node_modules/fomantic-ui-css/components/site.css");

  // FUI elements
  app.import("node_modules/fomantic-ui-css/components/button.css");
  app.import("node_modules/fomantic-ui-css/components/icon.css");
  app.import("node_modules/fomantic-ui-css/components/image.css");

  // FUI default theme
  const destDir = "themes/default/assets/fonts";
  app.import(
    "node_modules/fomantic-ui-css/themes/default/assets/fonts/icons.woff2",
    { destDir }
  );

  return app.toTree();
};
