/**
 * @fileoverview add fixer to rule no-new-symbol.
 * @author Pig Fang<g-plane@hotmail.com>
 */
"use strict";

const ruleComposer = require("eslint-rule-composer");
const utils = require("../utils");

const rule = utils.getFixableRule("no-new-symbol");

module.exports = ruleComposer.mapReports(
    rule,
    problem => {
        problem.fix = fixer => {
            const parent = problem.node.parent;

            return fixer.removeRange([parent.range[0], parent.range[0] + 4]);
        };
        return problem;
    }
);
