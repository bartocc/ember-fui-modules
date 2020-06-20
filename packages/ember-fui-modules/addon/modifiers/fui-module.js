/* eslint-disable ember/no-jquery */
import Modifier from "ember-modifier";
import $ from "jquery";

export default class FuiModuleModifier extends Modifier {
  get jqueryObject() {
    return $(this.element);
  }

  get semanticModule() {
    return this.jqueryObject[this.semanticModuleName].bind(this.jqueryObject);
  }

  settingExistsOnModule(setting) {
    return Object.keys(
      this.jqueryObject[this.semanticModuleName].settings
    ).includes(setting);
  }

  didInstall() {
    let settings = {};

    if (!this.semanticModuleName)
      this.semanticModuleName = this.args.positional[0];

    Object.entries(this.args.named).forEach(([setting, value]) => {
      if (this.settingExistsOnModule(setting)) settings[setting] = value;
    });

    this.semanticModule(settings);
  }

  willDestroy() {
    this.semanticModule("destroy");
  }
}
