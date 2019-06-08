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
const builtin = require("eslint/lib/rules/index");

/**
 * Loads a given rule from the filesystem and generates its documentation URL
 * @param {string} ruleName The name of the rule
 * @returns {Rule} The ESLint rule to export
 */
function loadRule(ruleName) {
    const rule = require(path.join(__dirname, "rules", ruleName));

    rule.meta.docs.url =
    `https://eslint.org/docs/rules/${ruleName}`;

    return rule;
}

const allRules = {};

for (const [ruleId, rule] of builtin) {
    if (rule.meta.fixable) {
        allRules[ruleId] = rule;
    }
}

// import all rules in lib/rules
fs.readdirSync(`${__dirname}/rules`)
    .filter(fileName => fileName.endsWith(".js") && /^[^._]/.test(fileName))
    .map(fileName => fileName.replace(/\.js$/, ""))
    .reduce((rules, ruleName) => Object.assign(rules, { [ruleName]: loadRule(ruleName) }), allRules);

module.exports = allRules;
