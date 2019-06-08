/**
 * @fileoverview Add fixer to rule no-caller.
 * @author Pig Fang <g-plane@hotmail.com>
 */
"use strict";

const ruleComposer = require("eslint-rule-composer");
const astUtils = require("../ast-utils");
const utils = require("../utils");

const rule = utils.getFixableRule("no-caller", false);

module.exports = ruleComposer.mapReports(
    rule,
    problem => {
        problem.fix = fixer => {
            const { node } = problem;

            if (node.property.name !== "callee") {
                return null;
            }

            const nearestFunction = astUtils.getUpperFunction(node);

            if (!nearestFunction) {
                return null;
            }

            const name = nearestFunction.id && nearestFunction.id.name;

            if (!name) {
                return null;
            }

            return fixer.replaceText(node, name);
        };
        return problem;
    }
);
