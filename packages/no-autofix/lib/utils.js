/**
 * @fileoverview utils used by the rule fixers.
 * @author 唯然<weiran.zsd@outlook.com>
 */
"use strict";
const ruleComposer = require("eslint-rule-composer");

exports.getNonFixableRule = function(rule) {
    return ruleComposer.mapReports(
        Object.create(rule),
        problem => (problem.fix = null, problem) // eslint-disable-line
    );
};
