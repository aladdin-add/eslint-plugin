/**
 * @fileoverview Add fixer to rule no-new-wrappers.
 * @author SukkaW <github@skk.moe>
 */
"use strict";

const ruleComposer = require("eslint-rule-composer");
const utils = require("../utils");

const rule = utils.getFixableRule("no-new-wrappers", true);

module.exports = ruleComposer.mapReports(
    rule,
    problem => {
        if (
            problem.node.type !== "NewExpression" || // ignore non new expression
            problem.node.arguments.length === 0 // ignore 'const a = new String'
        ) {
            return problem;
        }

        problem.fix = fixer => fixer.removeRange([problem.node.range[0], problem.node.range[0] + 4]);
        return problem;
    }
);
