/**
 * @fileoverview configs:unsafe for the plugin
 * @author 唯然<weiran.zsd@outlook.com>
 */
"use strict";

const packageMetadata = require("../../package");
const PLUGIN_NAME = packageMetadata.name.replace(/^eslint-plugin-/, "");
const allRules = require("../rules");

const unsafe = {
    plugins: [PLUGIN_NAME],
    rules: {}
};

// turn off core rules
Object.keys(allRules).filter(rule => allRules[rule].meta.recommended === false)
    .reduce((rules, ruleName) => Object.assign(rules, { [ruleName]: "off" }), unsafe.rules);

// turn on plugin rules
Object.keys(allRules).filter(rule => allRules[rule].meta.recommended === false)
    .reduce((rules, ruleName) => Object.assign(rules, { [`${PLUGIN_NAME}/${ruleName}`]: "error" }), unsafe.rules);

module.exports = unsafe;
