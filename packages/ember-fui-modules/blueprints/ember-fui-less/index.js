const fs = require("fs");
const path = require("path");
const resolve = require("resolve");
const bsplit = require("buffer-split");
const debug = require("debug")(
  `ember-fui-modules:blueprints:${path.basename(__dirname)}`
);

const _writeThemeConfig = function (dest) {
  let filePath = resolve.sync("fomantic-ui-less/theme.config.example", {
    basedir: __dirname,
  });
  fs.copyFileSync(filePath, dest);
};

const _writeSemanticLess = function (dest) {
  let filePath = resolve.sync("fomantic-ui-less/semantic.less", {
    basedir: __dirname,
  });

  let buffer = fs.readFileSync(filePath);
  fs.writeFileSync(
    dest,
    bsplit(buffer, Buffer.from("/* Modules */"))[0].toString()
  );
};

module.exports = {
  normalizeEntityName() {},

  files() {
    return [
      "__root__/styles/fomantic/theme.config",
      "__root__/styles/fomantic/semantic.less",
    ];
  },

  async beforeInstall(options, locals) {
    try {
      await this.addAddonToProject({ name: "ember-cli-less" });
    } catch (error) {
      debug("Could not add `ember-cli-less` addon to project: %o", error);
    }

    try {
      await this.addPackageToProject("fomantic-ui-less");
    } catch (error) {
      debug("Could not add `fomantic-ui-less` package to project: %o", error);
    }

    const fomanticDestDir = `__root__/styles/fomantic`;

    _writeThemeConfig(`${this.filesPath()}/${fomanticDestDir}/theme.config`);
    _writeSemanticLess(`${this.filesPath()}/${fomanticDestDir}/semantic.less`);

    await this.insertIntoFile(
      `${locals.fileMap["__root__"]}/styles/app.less`,
      "@import 'app/styles/fomantic/semantic';"
    );
  },

  async afterInstall() {
    this.files().forEach((path) =>
      fs.unlinkSync(`${this.filesPath()}/${path}`)
    );
  },
};
