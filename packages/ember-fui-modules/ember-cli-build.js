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
        "embed",
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

  app.import("node_modules/fomantic-ui-css/components/button.css");

  return app.toTree();
};
