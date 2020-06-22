import FuiModuleModifier from "./fui-module";

export default class FuiSliderModifier extends FuiModuleModifier {
  semanticModuleName = "slider";

  settingExistsOnModule(setting) {
    if (setting === "interpretLabel") return true;

    return super.settingExistsOnModule(setting);
  }
}
