/**
 * @fileoverview add fixer to rule no-alert.
 * @author Pig Fang<g-plane@hotmail.com>
 */
"use strict";

const ruleComposer = require("eslint-rule-composer");
const utils = require("../utils");

const rule = utils.getFixableRule("no-alert", false);

module.exports = ruleComposer.mapReports(
    rule,
    problem => {
        problem.fix = fixer => {
            const { node } = problem;

            // We only remove `alert` function, because `confirm` and `prompt` has return value.
            if (
                (node.callee.type === "Identifier" && node.callee.name === "alert") ||
                (node.callee.type === "MemberExpression" && node.callee.property.name === "alert")
            ) {
                if (node.arguments.every(arg => arg.type === "Literal" || arg.type === "Identifier")) {
                    return fixer.remove(node);
                }
            }

            return null;
        };
        return problem;
    }
);
