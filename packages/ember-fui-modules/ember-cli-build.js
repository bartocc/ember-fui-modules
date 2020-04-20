"use strict";

const EmberAddon = require("ember-cli/lib/broccoli/ember-addon");

module.exports = function (defaults) {
  let app = new EmberAddon(defaults, {
    fuiModules: {
      only: ["modal", "popup", "slider", "dropdown"],
    },
  });

  /*
    This build file specifies the options for the dummy test app of this
    addon, located in `/tests/dummy`
    This build file does *not* influence how the addon or the app using it
    behave. You most likely want to be modifying `./index.js` or app's build file
  */

  app.import("node_modules/fomantic-ui-css/components/accordion.css");
  app.import("node_modules/fomantic-ui-css/components/calendar.css");
  app.import("node_modules/fomantic-ui-css/components/checkbox.css");
  app.import("node_modules/fomantic-ui-css/components/dimmer.css");
  app.import("node_modules/fomantic-ui-css/components/dropdown.css");
  app.import("node_modules/fomantic-ui-css/components/embed.css");
  app.import("node_modules/fomantic-ui-css/components/modal.css");
  app.import("node_modules/fomantic-ui-css/components/nag.css");
  app.import("node_modules/fomantic-ui-css/components/popup.css");
  app.import("node_modules/fomantic-ui-css/components/progress.css");
  app.import("node_modules/fomantic-ui-css/components/rating.css");
  app.import("node_modules/fomantic-ui-css/components/search.css");
  app.import("node_modules/fomantic-ui-css/components/shape.css");
  app.import("node_modules/fomantic-ui-css/components/sidebar.css");
  app.import("node_modules/fomantic-ui-css/components/slider.css");
  app.import("node_modules/fomantic-ui-css/components/sticky.css");
  app.import("node_modules/fomantic-ui-css/components/tab.css");
  app.import("node_modules/fomantic-ui-css/components/toast.css");
  app.import("node_modules/fomantic-ui-css/components/transition.css");

  return app.toTree();
};
