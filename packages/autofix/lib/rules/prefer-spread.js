/**
 * @fileoverview add fixer to rule prefer-spread
 * @author Toru Nagashima
 * @author 唯然<weiran.zsd@outlook.com>
 */
"use strict";

const ruleComposer = require("eslint-rule-composer");
const utils = require("../utils");

const rule = utils.getFixableRule("prefer-spread", false);

module.exports = ruleComposer.mapReports(
    rule,
    (problem, metadata) => {
        problem.fix = function(fixer) {
            const node = problem.node;
            const sourceCode = metadata.sourceCode;
            const applied = node.callee.object;
            const expectedThis = (applied.type === "MemberExpression") ? applied.object : null;

            if (expectedThis && expectedThis.type !== "Identifier") {

                // Don't fix cases where the `this` value could be a computed expression.
                return null;
            }

            const propertyDot = metadata.sourceCode.getFirstTokenBetween(applied, node.callee.property, token => token.value === ".");

            return fixer.replaceTextRange([propertyDot.range[0], node.range[1]], `(...${sourceCode.getText(node.arguments[1])})`);

        };
        return problem;
    }
);
