/* eslint-disable ember/no-jquery */
import { setModifierManager, capabilities } from '@ember/modifier';
import $ from "jquery";
// eslint-disable-next-line no-unused-vars
import { assert } from "@ember/debug";

export default setModifierManager(
  () => ({
    capabilities: capabilities('3.13', { disableAutoTracking: true }),

    createModifier(factory, args) {
      return new factory.class(args);
    },

    installModifier(modifer, el, args) {
      modifer.jqueryObject = $(el);
      modifer.initModule(args.positional[0], args.named);
    },

    // eslint-disable-next-line no-unused-vars
    updateModifier(modifier, args) {
      modifier.update(args);
    },

    destroyModifier(modifer) {
      modifer.semanticModule('destroy');
    },
  }),
  class FuiModuleModifier {

    settings = {};

    get semanticModule() {
      return this.jqueryObject[this.semanticModuleName].bind(this.jqueryObject);
    }

    initModule(semanticModuleName, namedArgs) {
      this.semanticModuleName = semanticModuleName;

      // For each of the modules's possible settings, check if a named arg passed to the modifier has the same name
      // and build a settings object to initialize the module
      Object.entries(this.jqueryObject[this.semanticModuleName].settings).forEach(
        // eslint-disable-next-line no-unused-vars
        ([settingName, settingDefault]) => {

          // if the setting was not passed in the modifier's named args, do nothing
          if (!Object.prototype.hasOwnProperty.call(namedArgs, settingName)) return;

          // We know now that the modifier was passed a named arg that corresponds to a FUI module's setting
          let arg = namedArgs[settingName];
          this.settings[settingName] = arg;

          // if the setting is a callback function, add the component instance as the last argument
          // this.settings[settingName] =
          //   typeof settingDefault === "function"
          //     ? function() {
          //         arg(...arguments, this);
          //       }.bind(this)
          //     : arg;
        }
      );

      this.semanticModule(this.settings);
    }

    update(args) {
      switch(this.semanticModuleName) {
        case 'dropdown':
          var newValue = this.jqueryObject.children('input[type="hidden"]').val();
          this.semanticModule('set selected', newValue);
          break;
        case 'slider':
          if (!args.named.start) return;
          this.semanticModule('set value', args.named.start);
          break;
      }
    }
  }
);
