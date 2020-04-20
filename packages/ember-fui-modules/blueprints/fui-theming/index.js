"use strict";

const resolve = require("resolve");
const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
const debug = require("debug")(
  `ember-fui-modules:blueprints:${path.basename(__dirname)}`
);
const assert = require("assert").strict;

module.exports = {
  description:
    "Generates a fomantic-ui theme file in app/styles/fomantic/site/<type>s/<element>.<extension>",

  availableOptions: [
    {
      name: "type",
      type: String,
      default: "",
    },
    {
      name: "element",
      type: String,
      default: "",
    },
    {
      name: "extension",
      type: String,
      default: "variables",
    },
  ],

  normalizeEntityName() {},

  files() {
    return [this.filePath];
  },

  beforeInstall({ type, element, extension = "variables" }) {
    assert.ok(
      ["global", "element", "collection", "view"].includes(type),
      `--type must be one of "global", "element", "collection" or "view"`
    );
    assert.ok(
      ["variables", "overrides"].includes(extension),
      `--extension must be one of "variables", "overrides"`
    );

    const fileName = `${element}.${extension}`;
    const filePathToResolve = `fomantic-ui-less/_site/${type}s/${fileName}`;

    this.filePath = `__root__/styles/fomantic/site/${type}s/${fileName}`;
    const destFile = `${this.filesPath()}/${this.filePath}`;

    let srcFile;
    try {
      srcFile = resolve.sync(filePathToResolve, {
        basedir: __dirname,
      });
      debug("%o resolved to %o", filePathToResolve, srcFile);
      debug("copying %o to %o", srcFile, destFile);

      fs.copyFileSync(srcFile, destFile);
    } catch (error) {
      this.ui.writeLine(
        chalk.yellow(
          `The fomantic-ui '${element}' ${type} does not seem to be valid`
        )
      );
      throw "";
    }
  },

  async afterInstall() {
    this.files().forEach((path) => {
      const fullPath = `${this.filesPath()}/${path}`;
      debug("unlinking file %o", fullPath);
      fs.unlinkSync(fullPath);
    });
  },
};
