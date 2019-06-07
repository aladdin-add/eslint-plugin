/**
 * @fileoverview Add fixer to rule no-unused-vars.
 * @author Pig Fang <g-plane@hotmail.com>
 */
"use strict";

const ruleComposer = require("eslint-rule-composer");
const utils = require("../utils");

const rule = utils.getFixableRule("no-unused-vars", false);

/**
 * Check if an expression has side effect.
 *
 * @param {Node} node AST node
 * @returns {boolean} result
 */
function hasSideEffect(node) {
    if (["Literal", "Identifier", "ThisExpression"].includes(node.type)) {
        return false;
    }

    if (node.type === "MemberExpression") {
        return hasSideEffect(node.object) || hasSideEffect(node.property);
    }

    if (node.type === "TemplateLiteral") {
        return node.expressions.length !== 0;
    }

    return true;
}

module.exports = ruleComposer.mapReports(
    rule,
    (problem, { sourceCode }) => {
        problem.fix = fixer => {
            const { node } = problem;
            const { parent } = node;

            if (!parent) {
                return null;
            }
            const grand = parent.parent;

            switch (parent.type) {
                case "ImportSpecifier":
                case "ImportDefaultSpecifier":
                case "ImportNamespaceSpecifier":
                    if (!grand) {
                        return null;
                    }

                    if (grand.specifiers.length === 1) {
                        return fixer.remove(grand);
                    }

                    if (parent !== grand.specifiers[grand.specifiers.length - 1]) {
                        const comma = sourceCode.getTokenAfter(parent, { filter: token => token.value === "," });

                        return [fixer.remove(parent), fixer.remove(comma)];
                    }

                    if (grand.specifiers.filter(specifier => specifier.type === "ImportSpecifier").length === 1) {
                        const start = sourceCode.getTokenBefore(parent, { filter: token => token.value === "," }),
                            end = sourceCode.getTokenAfter(parent, { filter: token => token.value === "}" });

                        return fixer.removeRange([start.range[0], end.range[1]]);
                    }

                    return fixer.removeRange([
                        sourceCode.getTokenBefore(parent, { filter: token => token.value === "," }).range[0],
                        parent.range[1]
                    ]);
                case "VariableDeclarator":
                    if (!grand) {
                        return null;
                    }

                    if (hasSideEffect(parent.init)) {
                        return null;
                    }

                    if (grand.declarations.length === 1) {
                        return fixer.remove(grand);
                    }

                    if (parent !== grand.declarations[grand.declarations.length - 1]) {
                        const comma = sourceCode.getTokenAfter(parent, { filter: token => token.value === "," });

                        return [fixer.remove(parent), fixer.remove(comma)];
                    }

                    return [
                        fixer.remove(sourceCode.getTokenBefore(parent, { filter: token => token.value === "," })),
                        fixer.remove(parent)
                    ];
                default:
                    return null;
            }
        };
        return problem;
    }
);
