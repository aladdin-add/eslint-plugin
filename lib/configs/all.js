/**
 * @fileoverview config for the plugin
 * @author 唯然<weiran.zsd@outlook.com>
 */
"use strict";

const packageMetadata = require("../../package");
const PLUGIN_NAME = packageMetadata.name.replace(/^eslint-plugin-/, "");
const allRules = require("../rules");

const configAll = { plugins: ["autofix"] };

// turn off core rules
Object.keys(allRules)
    .reduce((rules, ruleName) => Object.assign(rules, { [`${ruleName}`]: "off" }), configAll);

// turn on plugin rules
Object.keys(allRules)
    .reduce((rules, ruleName) => Object.assign(rules, { [`${PLUGIN_NAME}/${ruleName}`]: "error" }), configAll);

module.exports = configAll;
