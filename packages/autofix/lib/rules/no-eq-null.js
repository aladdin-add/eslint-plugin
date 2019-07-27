/**
 * @fileoverview Add fixer to rule no-eq-null.
 * @author Pig Fang <g-plane@hotmail.com>
 */
"use strict";

const ruleComposer = require("eslint-rule-composer");
const utils = require("../utils");

const rule = utils.getFixableRule("no-eq-null", false);

module.exports = ruleComposer.mapReports(
    rule,
    (problem, { sourceCode }) => {
        problem.fix = fixer => {
            const { node } = problem;

            const token = node.right.type === "Literal" && node.right.raw === "null"
                ? sourceCode.getTokenBefore(node.right)
                : sourceCode.getTokenAfter(node.left);

            return fixer.insertTextAfter(token, "=");
        };
        return problem;
    }
);
