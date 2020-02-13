/**
 * @fileoverview Add fixer to rule "no-console"
 * @author Pig Fang <g-plane@hotmail.com>
 */
"use strict";

const ruleComposer = require("eslint-rule-composer");
const utils = require("../utils");

const rule = utils.getFixableRule("no-console", true);

module.exports = ruleComposer.mapReports(
    rule,
    problem => {
        problem.fix = fixer => {
            const { node } = problem;
            const parentType = node.parent.type;
            const isMethodCall = parentType === "CallExpression";

            if (parentType === "VariableDeclarator") {
                return null;
            }

            if (isMethodCall && !node.parent.arguments.every(arg => arg.type === "Literal" || arg.type === "Identifier")) {
                return null;
            }

            if (node.parent.parent) {
                const grandType = node.parent.parent.type;
                const maybeFlowType = isMethodCall && node.parent.parent.parent
                    ? node.parent.parent.parent.type
                    : grandType;

                if (
                    (maybeFlowType === "IfStatement" || maybeFlowType === "WhileStatement" || maybeFlowType === "ForStatement") &&
                    (isMethodCall ? grandType === "ExpressionStatement" : parentType === "ExpressionStatement")
                ) {
                    return isMethodCall ? fixer.replaceText(node.parent, "{}") : fixer.replaceText(node, "{}");
                }
            }

            return isMethodCall ? fixer.remove(node.parent) : fixer.remove(problem.node);

        };

        return problem;
    }
);
