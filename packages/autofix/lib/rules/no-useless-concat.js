/**
 * @fileoverview add fixer to rule no-useless-concat.
 * @author Pig Fang <g-plane@hotmail.com>
 */
"use strict";

const ruleComposer = require("eslint-rule-composer");
const utils = require("../utils");

const rule = utils.getFixableRule("no-useless-concat");

module.exports = ruleComposer.mapReports(
    rule,
    problem => {
        problem.fix = fixer => {
            const { node } = problem;

            return fixer.replaceText(node, `"${node.left.value}${node.right.value}"`);
        };
        return problem;
    }
);
