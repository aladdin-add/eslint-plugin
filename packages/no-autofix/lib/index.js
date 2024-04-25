/**
 * @fileoverview An ESLint plugin provides autofix for some core rules.
 * @author 唯然<weiran.zsd@outlook.com>
 */
"use strict";

const all = require("./configs/all");
const rules = require("./rules");

const pkg = {
    configs: {
        all
    },
    rules
};

Object.assign(pkg.configs, {
    "flat/all": { plugins: { "no-autofix": pkg }, rules: pkg.configs.all.rules }
});

module.exports = pkg;
