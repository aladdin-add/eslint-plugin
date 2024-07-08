/**
 * @fileoverview An ESLint plugin provides autofix for some core rules.
 * @author 唯然<weiran.zsd@outlook.com>
 */
"use strict";

const all = require("./configs/all");
const recommended = require("./configs/recommended");
const unsafe = require("./configs/unsafe");
const rules = require("./rules");
const pkg = require("../package.json");

const plugin = {
    meta: { name: pkg.name, version: pkg.version },
    configs: {
        all,
        recommended,
        unsafe
    },
    rules
};

Object.assign(plugin.configs, {
    "flat/all": { name: "eslint-plugin-autofix/all", ...plugin.configs.all, plugins: { autofix: plugin }, rules: plugin.configs.all.rules },
    "flat/recommended": { name: "eslint-plugin-autofix/recommended", ...plugin.configs.recommended, plugins: { autofix: plugin }, rules: plugin.configs.recommended.rules },
    "flat/unsafe": { name: "eslint-plugin-autofix/unsafe", ...plugin.configs.unsafe, plugins: { autofix: plugin }, rules: plugin.configs.unsafe.rules }
});

module.exports = plugin;
