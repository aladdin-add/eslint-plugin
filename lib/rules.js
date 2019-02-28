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
const builtin = require("eslint/lib/built-in-rules-index");


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

const builtinFixable = Object.keys(builtin)
    .filter(rule => builtin[rule].meta.fixable)
    .reduce((acc, cur) => {
        acc[cur] = builtin[cur];
        return acc;
    }, {});

// import all rules in lib/rules
const allRules = fs.readdirSync(`${__dirname}/rules`)
    .filter(fileName => fileName.endsWith(".js") && /^[^._]/.test(fileName))
    .map(fileName => fileName.replace(/\.js$/, ""))
    .reduce((rules, ruleName) => Object.assign(rules, { [ruleName]: loadRule(ruleName) }), builtinFixable);

module.exports = allRules;
