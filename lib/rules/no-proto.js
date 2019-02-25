/**
 * @fileoverview Add fixer to rule no-proto.
 * @author Pig Fang <g-plane@hotmail.com>
 */
"use strict";

const ruleComposer = require("eslint-rule-composer");
const utils = require("../utils");

const rule = utils.getFixableRule("no-proto", false);

module.exports = ruleComposer.mapReports(
    rule,
    (problem, { sourceCode }) => {
        problem.fix = fixer => {
            const { node } = problem;

            return fixer.replaceText(node, `Object.getPrototypeOf(${sourceCode.getText(node.object)})`);
        };
        return problem;
    }
);
