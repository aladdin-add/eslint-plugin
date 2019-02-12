/**
 * @fileoverview add fixer to rule no-prototype-builtins.
 * @author Pig Fang<g-plane@hotmail.com>
 */
"use strict";

const ruleComposer = require("eslint-rule-composer");
const utils = require("../utils");

const rule = utils.getFixableRule("no-prototype-builtins");

module.exports = ruleComposer.mapReports(
    rule,
    (problem, { sourceCode }) => {
        problem.fix = fixer => {
            const { node } = problem;
            const prop = node.callee.property.name;
            const args = node.arguments.map(arg => sourceCode.getText(arg)).join(", ");

            return fixer.replaceText(
                node,
                `Object.prototype.${prop}.call(${sourceCode.getText(node.callee.object)}, ${args})`
            );
        };
        return problem;
    }
);
