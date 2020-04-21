<!-- omit in toc -->
# ember-fui-modules

![CI](https://github.com/bartocc/ember-fui-modules/workflows/CI/badge.svg)
[![Ember Observer Score](https://emberobserver.com/badges/ember-fui-modules.svg)](https://emberobserver.com/addons/ember-fui-modules)

Use Fomantic UI modules in an Ember.js app.

<!-- omit in toc -->
## Table of contents

- [Installation](#installation)
- [Configuration](#configuration)
  - [Specify what modules your application needs](#specify-what-modules-your-application-needs)
  - [Opt-out of automatic CSS import](#opt-out-of-automatic-css-import)
- [Usage](#usage)
  - [Example usage for the Dropdown module](#example-usage-for-the-dropdown-module)
  - [Example usage for the Modal module](#example-usage-for-the-modal-module)
  - [Example usage for the Popup module](#example-usage-for-the-popup-module)
  - [Example usage for the Slider module](#example-usage-for-the-slider-module)
- [Compatibility](#compatibility)
- [Contributing](#contributing)
- [License](#license)
- [Credits](#credits)

## Installation

```
ember install ember-fui-modules
```

If your app already depends on one of the Fomantic UI packages ([fomantic-ui](https://www.npmjs.com/package/fomantic-ui), [fomantic-ui-css](https://www.npmjs.com/package/fomantic-ui-css) or [fomantic-ui-less](https://www.npmjs.com/package/fomantic-ui-less)), `ember-fui-modules` will use this package to import the FUI module files (and CSS if you did not [Opt-out of automatic CSS import](#opt-out-of-automatic-css-import)).

If, on the other hand, your app does not already depend on a FUI package, `fomantic-ui-css` will also be added to your app.

This way, `ember-fui-modules` does not refenrece FUI as a `dependency` and you are free to use the package and version you wish. If tomorrow, a new FUI module is released, you won't need a new `ember-fui-modules` release. Just upgrade the `fomantic-ui*` package you use.

## Configuration

### Specify what modules your application needs

⚠️ By default, this addon does not include any FUI module. This is to ensure that no unnecessary js files are added to your app's bundle. ⚠️

If you want to use a FUI module in your app, add the following in `ember-cli-build.js`:

```js
fuiModules: {
  only: ["accordion", "modal"]
}
```

This will automatically `import` the `accordion.js` and `modal.js` files in your app's bundle.

Also note that some FUI modules depend on other modules. For example, the `modal` module depends on the `dimmer` module.
`ember-fui-modules` will know this and automatically `import` the necessary module dependencies.

### Opt-out of automatic CSS import

For FUI modules to work, both `js` and `CSS` files must be imported. By default, this addon imports the CSS for the modules you required with `fuiModules.only`.

If, for instance, you use
[ember-fui-less](https://github.com/bartocc/ember-fui-less) to customize the FUI
theme, or want to import FUI CSS by any other way in your app, you can opt-out of automatic CSS import by setting `fuiModules.importCSS` to false with:

```js
fuiModules: {
  importCSS: false
}
```

## Usage

The one and only thing added by this addon to your app's namespace is the
`fui-module` modifier. This modifier takes only one positional param to specify
what module you want to use and as many named params as the FUI module has settings.

If you want to know what settings are available for a given module, visit the module's settings page at https://fomantic-ui.com/modules/moduleName.html#/settings), or in a console in the brower, you can type `$.fn.moduleName.settings`.

### Example usage for the Dropdown module

```hbs
<select {{fui-module "dropdown" onChange=this.setGender}} class="ui dropdown">
  <option value="">Gender</option>
  <option value="1">Male</option>
  <option value="0">Female</option>
</select>
```

TIP: if you want to know what arguments will be passed to the `onChange` callback `this.setGender`, check the signature of `$.fn.dropdown.settings.onChange` in a console.

### Example usage for the Modal module

```hbs
<div
  class="ui modal"
  {{fui-module "modal"
      onApprove=this.modalApproved
      onDeny=this.modalDenied
      detachable=false
      context=".ember-application"
  }}
  {{ref this "modalElement"}}
>
  <div class="header">Modal header</div>
  <div class="content">Modal content</div>
  <div class="actions">
    <div class="ui deny button">Deny button</div>
    <div class="ui approve button">Approve button</div>
  </div>
</div>

<button type="button" {{on "click" this.showModal}}>click me to show modal</button>
```

```js
import Component from "@glimmer/component";
import jQuery from "jquery";

export default class MyComponent extends Component {
  showModal(clickEvent) {
    // this.modalElement is set in the template thanks to [ember-ref-modifier](https://github.com/lifeart/ember-ref-modifier)
    // This is just an example implementation, and you are not forced to use ember-ref-modifier at all.
    // It is up to you to reference the modal element the way you want!
    jQuery(this.modalElement).modal("show");
  }

  modalApproved() {
    // ...
  }

  modalDenied() {
    // ...
  }

}
```

TIP: Using `context=".ember-application"` is really usefull when viewing your tests in the browser because this will restrict the dimmer only to the container, now the entire browser viewport.

TIP2: The `detachable` setting definition from https://fomantic-ui.com/modules/modal.html#/settings:`If set to false will prevent the modal from being moved to inside the dimmer`.

### Example usage for the Popup module

```hbs
<button {{fui-module "popup"}} type="button" class="ui button">hover me to see the popup</button>
<div class="ui popup">I am the popup content</div>
```

TIP: Beware, the `ui popup` CSS classes must be placed on the element representing the popup content. On the other hand, the `fui-module` modifier must be used on the element triggering the popup.

### Example usage for the Slider module

```hbs
<div {{fui-module "slider" onMove=(fn (mut this.sliderValue))}} class="ui slider" ></div>
<input type="number" value={{this.sliderValue}}>
```

## Compatibility

* Ember.js v3.13 or above
* Ember CLI v2.13 or above
* Node.js v10 or above

## Contributing

See the [Contributing](CONTRIBUTING.md) guide for details.

## License

This project is licensed under the [MIT License](LICENSE.md).

## Credits

Yarn workspace test-packages setup idea inspired from [ember-css-modules](https://github.com/salsify/ember-css-modules)
