<!-- omit in toc -->
# ember-fui-modules

![CI](https://github.com/bartocc/ember-fui-modules/workflows/CI/badge.svg)
[![Ember Observer Score](https://emberobserver.com/badges/ember-fui-modules.svg)](https://emberobserver.com/addons/ember-fui-modules)

Use Fomantic UI modules in an Ember.js app.

<!-- omit in toc -->
## Table of contents

- [Installation](#installation)
- [Compatibility](#compatibility)
- [Usage](#usage)
  - [Specify what modules your application needs](#specify-what-modules-your-application-needs)
  - [Optout of automatic CSS import](#optout-of-automatic-css-import)
- [Contributing](#contributing)
- [License](#license)
- [Credits](#credits)

## Installation

```
ember install ember-fui-modules
```

This will execute the following actions:

1. Add `fomantic-ui-css` to your devDependencies

## Compatibility

* Ember.js v3.13 or above
* Ember CLI v2.13 or above
* Node.js v12 or above

## Usage

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

### Optout of automatic CSS import

For FUI modules to work, both `js` and `CSS` files must be imported. By default, this addon imports the CSS for the modules you required with `fuiModules.only`.

If, for instance, you use
[ember-fui-less](https://github.com/bartocc/ember-fui-less) to customize the FUI
theme, or want to import FUI CSS by any other way in your app, you can optout of automatic CSS import by setting `fuiModules.importCSS` to false with:

```js
fuiModules: {
  importCSS: false
}
```

## Contributing

See the [Contributing](CONTRIBUTING.md) guide for details.

## License

This project is licensed under the [MIT License](LICENSE.md).

## Credits

Yarn workspace test-packages setup idea inspired from [ember-css-modules](https://github.com/salsify/ember-css-modules)
