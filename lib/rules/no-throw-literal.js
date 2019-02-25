/**
 * @fileoverview Add fixer to rule no-throw-literal.
 * @author Pig Fang <g-plane@hotmail.com>
 */
"use strict";

const ruleComposer = require("eslint-rule-composer");
const utils = require("../utils");

const rule = utils.getFixableRule("no-throw-literal", false);

module.exports = ruleComposer.mapReports(
    rule,
    (problem, { sourceCode }) => {
        problem.fix = fixer => {
            const { node } = problem;
            const { argument } = node;

            if (argument.type === "Identifier") {
                return null;
            }
            return fixer.replaceText(node, `throw new Error(${sourceCode.getText(argument)});`);
        };
        return problem;
    }
);
