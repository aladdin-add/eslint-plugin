/**
 * @fileoverview add fixer to rule no-alert.
 * @author Pig Fang<g-plane@hotmail.com>
 */
"use strict";

const ruleComposer = require("eslint-rule-composer");
const utils = require("../utils");

const rule = utils.getFixableRule("no-alert");

module.exports = ruleComposer.mapReports(
    rule,
    problem => {
        problem.fix = fixer => {
            const { node } = problem;

            if (node.arguments.every(arg => arg.type === "Literal" || arg.type === "Identifier")) {
                return fixer.remove(node);
            }
            return null;
        };
        return problem;
    }
);
