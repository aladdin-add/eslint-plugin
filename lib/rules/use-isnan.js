/**
 * @fileoverview add fixer to rule use-isnan.
 * @author Pig Fang<g-plane@hotmail.com>
 */
"use strict";

const ruleComposer = require("eslint-rule-composer");
const utils = require("../utils");

const rule = utils.getFixableRule("use-isnan");

module.exports = ruleComposer.mapReports(
    rule,
    (problem, { sourceCode }) => {
        problem.fix = fixer => {
            const { node } = problem;
            const op = node.operator.startsWith("!") ? "!" : "";
            const rawText = sourceCode.getText(node.left.name === "NaN" ? node.right : node.left);

            return fixer.replaceText(node, `${op}isNaN(${rawText})`);
        };
        return problem;
    }
);
