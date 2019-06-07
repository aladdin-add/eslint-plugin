/**
 * @fileoverview Add fixer to rule no-unused-vars.
 * @author Pig Fang <g-plane@hotmail.com>
 */
"use strict";

const ruleComposer = require("eslint-rule-composer");
const utils = require("../utils");

const rule = utils.getFixableRule("no-unused-vars", false);

module.exports = ruleComposer.mapReports(
    rule,
    (problem, { sourceCode }) => {
        problem.fix = fixer => {
            const { node } = problem;
            const { parent } = node;

            if (!parent) {
                return null;
            }

            switch (parent.type) {
                case "ImportSpecifier":
                case "ImportDefaultSpecifier":
                case "ImportNamespaceSpecifier":
                    // eslint-disable-next-line no-case-declarations
                    const importNode = parent.parent;

                    if (importNode.specifiers.length === 1) {
                        return fixer.remove(importNode);
                    }

                    if (parent !== importNode.specifiers[importNode.specifiers.length - 1]) {
                        const comma = sourceCode.getTokenAfter(parent, { filter: token => token.value === "," });

                        return [fixer.remove(parent), fixer.remove(comma)];
                    }

                    if (importNode.specifiers.filter(specifier => specifier.type === "ImportSpecifier").length === 1) {
                        const start = sourceCode.getTokenBefore(parent, { filter: token => token.value === "," }),
                            end = sourceCode.getTokenAfter(parent, { filter: token => token.value === "}" });

                        return fixer.removeRange([start.range[0], end.range[1]]);
                    }

                    return fixer.removeRange([
                        sourceCode.getTokenBefore(parent, { filter: token => token.value === "," }).range[0],
                        parent.range[1]
                    ]);
                default:
                    return null;
            }
        };
        return problem;
    }
);
