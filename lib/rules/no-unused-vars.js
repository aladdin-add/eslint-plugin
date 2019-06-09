/**
 * @fileoverview Add fixer to rule no-unused-vars.
 * @author Pig Fang <g-plane@hotmail.com>
 */
"use strict";

const ruleComposer = require("eslint-rule-composer");
const utils = require("../utils");
const { hasSideEffect } = require("../ast-utils");

const rule = utils.getFixableRule("no-unused-vars", false);

const commaFilter = { filter: token => token.value === "," };

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
                        const comma = sourceCode.getTokenAfter(parent, commaFilter);

                        return [fixer.remove(parent), fixer.remove(comma)];
                    }

                    if (grand.specifiers.filter(specifier => specifier.type === "ImportSpecifier").length === 1) {
                        const start = sourceCode.getTokenBefore(parent, commaFilter),
                            end = sourceCode.getTokenAfter(parent, { filter: token => token.value === "}" });

                        return fixer.removeRange([start.range[0], end.range[1]]);
                    }

                    return fixer.removeRange([
                        sourceCode.getTokenBefore(parent, commaFilter).range[0],
                        parent.range[1]
                    ]);
                case "VariableDeclarator":
                    if (!grand) {
                        return null;
                    }

                    if (parent.init && hasSideEffect(parent.init)) {
                        return null;
                    }

                    if (grand.declarations.length === 1) {
                        return fixer.remove(grand);
                    }

                    if (parent !== grand.declarations[grand.declarations.length - 1]) {
                        const comma = sourceCode.getTokenAfter(parent, commaFilter);

                        return [fixer.remove(parent), fixer.remove(comma)];
                    }

                    return [
                        fixer.remove(sourceCode.getTokenBefore(parent, commaFilter)),
                        fixer.remove(parent)
                    ];
                case "AssignmentPattern":
                    if (hasSideEffect(parent.right)) {
                        return null;
                    }
                    return fixer.remove(parent);
                case "RestElement":
                case "Property":
                    if (!grand) {
                        return null;
                    }

                    if (grand.properties.length === 1) {
                        const identifierRemoval = fixer.remove(parent);
                        const comma = sourceCode.getLastToken(grand, commaFilter);

                        return comma ? [identifierRemoval, fixer.remove(comma)] : identifierRemoval;
                    }

                    if (parent === grand.properties[grand.properties.length - 1]) {
                        const comma = sourceCode.getTokenBefore(parent, commaFilter);

                        return [fixer.remove(parent), fixer.remove(comma)];
                    }

                    return [
                        fixer.remove(parent),
                        fixer.remove(sourceCode.getTokenAfter(parent, commaFilter))
                    ];
                case "ArrayPattern":
                    return fixer.remove(node);
                default:
                    return null;
            }
        };
        return problem;
    }
);
