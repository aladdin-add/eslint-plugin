/**
 * @fileoverview expored all rules in the plugin.
 * @author 唯然<weiran.zsd@outlook.com>
 */

"use strict";

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------
const eslintVersion = require("eslint/package.json").version;
const { getNonFixableRule } = require("./utils");
const builtinRules = {};

// eslint v6 restructed its codebase
// TODO: this might be unreliable
if (eslintVersion >= "6.0.0") {
    const builtin = require("eslint/lib/rules"); // eslint-disable-line node/no-missing-require

    for (const [ruleId, rule] of builtin) {
        builtinRules[ruleId] = rule;
    }
} else {
    const builtin = require("eslint/lib/built-in-rules-index"); // eslint-disable-line node/no-missing-require

    Object.keys(builtin)
        .reduce((acc, cur) => {
            acc[cur] = builtin[cur];
            return acc;
        }, builtinRules);
}

const allRules = {};

Object.keys(builtinRules).reduce((acc, cur) => {
    acc[cur] = getNonFixableRule(cur);
    return acc;
}, allRules);
module.exports = allRules;
