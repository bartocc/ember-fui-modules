import BaseComponent from '../base/index';
import { action } from "@ember/object";

export default class FuiDropdownComponent extends BaseComponent {
  static jqueryPluginName = 'dropdown';

  @action
  setSelected() {
    this.semanticModule('set selected', this.args.selected);
  }
}
