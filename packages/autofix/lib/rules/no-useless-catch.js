/**
 * @fileoverview Add fixer to rule no-useless-catch.
 * @author Pig Fang <g-plane@hotmail.com>
 */
"use strict";

const ruleComposer = require("eslint-rule-composer");
const utils = require("../utils");

const rule = utils.getFixableRule("no-useless-catch", false);

module.exports = ruleComposer.mapReports(
    rule,
    (problem, { sourceCode }) => {
        problem.fix = fixer => {
            const { node } = problem;

            if (node.parent.finalizer) {
                return fixer.remove(node);
            }

            return fixer.replaceText(node, sourceCode.getText(node.block));
        };
        return problem;
    }
);
