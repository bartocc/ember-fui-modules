import FuiModuleModifier from "./fui-module";

export default class FuiSliderModifier extends FuiModuleModifier {
  semanticModuleName = "slider";

  // see https://github.com/fomantic/Fomantic-UI/issues/1526#issuecomment-646082418
  settingExistsOnModule(setting) {
    if (setting === "interpretLabel") return true;

    return super.settingExistsOnModule(setting);
  }
}
