/**
 * @fileoverview utils used by the rule fixers.
 * @author 唯然<weiran.zsd@outlook.com>
 */
"use strict";
const eslint = require("eslint");
const linter = new eslint.Linter();

exports.getFixableRule = function(ruleName, type = "code") {
    const rule = linter.getRules().get(ruleName);

    rule.meta.fixable = type;
    return rule;
};
