/**
 * @fileoverview add fixer to rule valid-typeof.
 * @author Pig Fang<g-plane@hotmail.com>
 */
"use strict";

const ruleComposer = require("eslint-rule-composer");
const utils = require("../utils");
const { closest } = require("fastest-levenshtein");

const rule = utils.getFixableRule("valid-typeof", false);
const VALID_TYPES = ["symbol", "undefined", "object", "boolean", "number", "string", "function"];

module.exports = ruleComposer.mapReports(
    rule,
    problem => {
        problem.fix = fixer => {
            const { node } = problem,
                { parent } = node;
            const sibling = parent.left.type.endsWith("Literal") ? parent.left : parent.right;
            const value = sibling.type === "Literal" ? sibling.value : sibling.quasis[0].value.cooked;
            const best = closest(value, VALID_TYPES);

            if (best.rating > 0.3) {
                return fixer.replaceText(sibling, `"${best}"`);
            }
            return null;
        };
        return problem;
    }
);
