/* eslint-disable ember/no-jquery */
import Component from "@glimmer/component";
import $ from "jquery";
import { action } from "@ember/object";
import { assert } from "@ember/debug";

export default class BaseComponent extends Component {
  settings = {};

  // the jQuery object wrapping the DOM element for the module
  jqueryObject;

  get semanticModule() {
    if (!this.jqueryObject) return () => {};
    return this.jqueryObject[this.constructor.jqueryPluginName].bind(this.jqueryObject);
  }

  @action
  initModule(el) {
    assert(
      "this.constructor.jqueryPluginName must be defined",
      this.constructor.jqueryPluginName
    );
    this.jqueryObject = $(el);

    Object.entries(this.jqueryObject[this.constructor.jqueryPluginName].settings).forEach(
      ([settingName, settingDefault]) => {
        let arg = this.args[settingName];
        if (!arg) return;

        // if the setting is a callback function, add the component instance as the last argument
        this.settings[settingName] =
          typeof settingDefault === "function"
            ? function() {
                arg(...arguments, this);
              }.bind(this)
            : arg;
      }
    );

    // define a method on the component with the name of the semanticModule
    // For example, this would allow you to do fuiDropdownComponentInstance.dropdown('get selectedItem')
    this[this.constructor.jqueryPluginName] = this.semanticModule;

    this.semanticModule(this.settings);
  }
}
