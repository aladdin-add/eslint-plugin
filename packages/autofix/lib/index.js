/**
 * @fileoverview An ESLint plugin provides autofix for some core rules.
 * @author 唯然<weiran.zsd@outlook.com>
 */
"use strict";

const all = require("./configs/all");
const recommended = require("./configs/recommended");
const unsafe = require("./configs/unsafe");
const rules = require("./rules");

const pkg = {
    configs: {
        all,
        recommended,
        unsafe
    },
    rules
};

Object.assign(pkg.configs, {
    "flat/all": { ...pkg.configs.all, plugins: { autofix: pkg }, rules: pkg.configs.all.rules },
    "flat/recommended": { ...pkg.configs.recommended, plugins: { autofix: pkg }, rules: pkg.configs.recommended.rules },
    "flat/unsafe": { ...pkg.configs.unsafe, plugins: { autofix: pkg }, rules: pkg.configs.unsafe.rules }
});

module.exports = pkg;
