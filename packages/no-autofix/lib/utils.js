/**
 * @fileoverview utils used by the rule fixers.
 * @author 唯然<weiran.zsd@outlook.com>
 */
"use strict";
const ruleComposer = require("eslint-rule-composer");

exports.getNonFixableRule = function(rule) {
    return ruleComposer.mapReports(
        Object.create(rule),
        // eslint-disable-next-line no-return-assign, no-sequences
        problem => (problem.fix = null, problem)
    );
};
