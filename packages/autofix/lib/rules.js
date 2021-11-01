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
const eslintVersion = Number.parseInt(require("eslint/package.json").version, 10);


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

// eslint v6 restructed its codebase
// TODO: this might be unreliable
if (eslintVersion >= 8) {
    const { builtinRules } = require("eslint/use-at-your-own-risk"); // eslint-disable-line node/no-missing-require

    for (const [ruleId, rule] of builtinRules) {
        if (rule.meta.fixable) {
            allRules[ruleId] = rule;
        }
    }
} else if (eslintVersion >= 6) {
    const builtin = require("eslint/lib/rules");

    for (const [ruleId, rule] of builtin) {
        if (rule.meta.fixable) {
            allRules[ruleId] = rule;
        }
    }
} else {
    const builtin = require("eslint/lib/built-in-rules-index"); // eslint-disable-line node/no-missing-require

    Object.keys(builtin)
        .filter(rule => builtin[rule].meta.fixable)
        .reduce((acc, cur) => {
            acc[cur] = builtin[cur];
            return acc;
        }, allRules);
}

// import all rules in lib/rules
fs.readdirSync(path.join(__dirname, "rules"))
    .filter(fileName => fileName.endsWith(".js") && /^[^._]/u.test(fileName))
    .map(fileName => fileName.replace(/\.js$/u, ""))
    .reduce((rules, ruleName) => Object.assign(rules, { [ruleName]: loadRule(ruleName) }), allRules);

module.exports = allRules;
