/**
 * @fileoverview An ESLint plugin provides autofix for some core rules.
 * @author 唯然<weiran.zsd@outlook.com>
 */
"use strict";

const all = require("./configs/all");
const rules = require("./rules");
const pkg = require("../package.json");

const plugin = {
    meta: { name: pkg.name, version: pkg.version },
    configs: {
        all
    },
    rules
};

Object.assign(plugin.configs, {
    "flat/all": { name: "eslint-plugin-no-autofix/all", plugins: { "no-autofix": plugin }, rules: plugin.configs.all.rules }
});

module.exports = plugin;
