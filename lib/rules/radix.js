/**
 * @fileoverview add fixer to rule radix.
 * @author Pig Fang<g-plane@hotmail.com>
 */
"use strict";

const ruleComposer = require("eslint-rule-composer");
const utils = require("../utils");

const rule = utils.getFixableRule("radix");

module.exports = ruleComposer.mapReports(
    rule,
    (problem, { options, sourceCode }) => {
        problem.fix = fixer => {
            const [option = "always"] = options;
            const { node } = problem;

            if (node.arguments.length === 0) {
                return null;
            }

            if (option === "always" && node.arguments.length === 1) {
                return fixer.insertTextAfter(node.arguments[0], ", 10");
            }
            if (option === "as-needed" && node.arguments.length > 1) {
                const radix = node.arguments[1];

                if (radix.type === "Literal" && radix.value === 10) {
                    return fixer.removeRange([sourceCode.getTokenBefore(radix).range[0], radix.range[1]]);
                }
            }
            return null;
        };
        return problem;
    }
);
