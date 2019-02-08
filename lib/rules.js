/**
 * @fileoverview expored all rules in the plugin.
 * @author 唯然<weiran.zsd@outlook.com>
 */

"use strict";

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const fs = require("fs");
const path = require("path");
const packageMetadata = require("../package");
const PLUGIN_VERSION = packageMetadata.version;

// ------------------------------------------------------------------------------
// Plugin Definition
// ------------------------------------------------------------------------------

/**
 * Loads a given rule from the filesystem and generates its documentation URL
 * @param {string} ruleName The name of the rule
 * @returns {Rule} The ESLint rule to export
 */
function loadRule(ruleName) {
    const rule = require(path.join(__dirname, "rules", ruleName));

    rule.meta.docs.url =
    `https://github.com/aladdin-add/eslint-plugin-autofix/tree/v${PLUGIN_VERSION}/docs/rules/${ruleName}.md`;

    return rule;
}

// import all rules in lib/rules
const allRules = fs.readdirSync(`${__dirname}/rules`)
    .filter(fileName => fileName.endsWith(".js") && /^[^._]/.test(fileName))
    .map(fileName => fileName.replace(/\.js$/, ""))
    .reduce((rules, ruleName) => Object.assign(rules, { [ruleName]: loadRule(ruleName) }), {});


module.exports = allRules;
