/**
 * @fileoverview Add fixer to rule no-new-native-nonconstructor.
 * @author SukkaW <github@skk.moe>
 */
"use strict";

const ruleComposer = require("eslint-rule-composer");
const utils = require("../utils");

const rule = utils.getFixableRule("no-new-native-nonconstructor", true);

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
