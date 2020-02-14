/**
 * @fileoverview configs:all for the plugin
 * @author 唯然<weiran.zsd@outlook.com>
 */
"use strict";

const packageMetadata = require("../../package");
const PLUGIN_NAME = packageMetadata.name.replace(/^eslint-plugin-/, "");
const allRules = require("../rules");

const all = {
    plugins: [PLUGIN_NAME],
    rules: {}
};

// turn on plugin rules
Object.keys(allRules)
    .reduce((rules, ruleName) => Object.assign(rules, { [`${PLUGIN_NAME}/${ruleName}`]: "error" }), all.rules);

module.exports = all;
