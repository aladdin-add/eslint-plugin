/**
 * @fileoverview eslint-plugin-web
 * @author 唯然<weiran.zsd@outlook.com>
 */
"use strict";
const pkg = require("../package.json");
const ruleIds = ["no-alert", "no-script-url"];
const all = {};
const rules = {};

for (const ruleId of ruleIds) {
    all[ruleId] = 2;
    rules[ruleId] = require(`../lib/rules/${ruleId}.js`);
}

module.exports = {
    meta: { name: pkg.name, version: pkg.version },
    configs: {
        all: {
            plugins: ["web"],
            rules: all
        }

    },
    rules
};
