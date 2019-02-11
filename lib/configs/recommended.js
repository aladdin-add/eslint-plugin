/**
 * @fileoverview configs:recommended for the plugin
 * @author 唯然<weiran.zsd@outlook.com>
 */
"use strict";

const packageMetadata = require("../../package");
const PLUGIN_NAME = packageMetadata.name.replace(/^eslint-plugin-/, "");
const allRules = require("../rules");

const recommended = {
    plugins: [PLUGIN_NAME],
    rules: {}
};

// turn off core rules
Object.keys(allRules).filter(rule => allRules[rule].meta.recommended === true)
    .reduce((rules, ruleName) => Object.assign(rules, { [ruleName]: "off" }), recommended.rules);

// turn on plugin rules
Object.keys(allRules).filter(rule => allRules[rule].meta.recommended === true)
    .reduce((rules, ruleName) => Object.assign(rules, { [`${PLUGIN_NAME}/${ruleName}`]: "error" }), recommended.rules);

module.exports = recommended;
