/**
 * @fileoverview utils used by the rule fixers.
 * @author 唯然<weiran.zsd@outlook.com>
 */
"use strict";
const eslint = require("eslint");
const ruleComposer = require("eslint-rule-composer");

const linter = new eslint.Linter();

exports.getNonFixableRule = function(ruleName) {
    const rule = linter.getRules().get(ruleName);

    return ruleComposer.mapReports(
        Object.create(rule),
        problem => (problem.fix = null, problem) // eslint-disable-line
    );
};
