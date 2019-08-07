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

/**
 * Process the raw options into a config object.
 *
 * This function is directly copied from eslint source code.
 *
 * @param {Object} options Options from context
 * @returns {Object} config The rule config
 */
function getConfig(options) {
    const firstOption = options[0];
    const config = {
        vars: "all",
        args: "after-used",
        ignoreRestSiblings: false,
        caughtErrors: "none"
    };

    if (firstOption) {
        if (typeof firstOption === "string") {
            config.vars = firstOption;
        } else {
            config.vars = firstOption.vars || config.vars;
            config.args = firstOption.args || config.args;
            config.ignoreRestSiblings = firstOption.ignoreRestSiblings || config.ignoreRestSiblings;
            config.caughtErrors = firstOption.caughtErrors || config.caughtErrors;

            if (firstOption.varsIgnorePattern) {
                config.varsIgnorePattern = new RegExp(firstOption.varsIgnorePattern, "u");
            }

            if (firstOption.argsIgnorePattern) {
                config.argsIgnorePattern = new RegExp(firstOption.argsIgnorePattern, "u");
            }

            if (firstOption.caughtErrorsIgnorePattern) {
                config.caughtErrorsIgnorePattern = new RegExp(firstOption.caughtErrorsIgnorePattern, "u");
            }
        }
    }

    return config;
}

/**
 * getIgnoredArgPrefix extracts the prefix from the regex.
 *
 * Commonly argsIgnorePattern will be a regex that matches a prefix to a
 * variable name. The prefix is a way to indicate the arguments is explicitly
 * unused.
 *
 * @param {Object} config rule config
 * @returns {string | null} the prefix, if it exists
 */
function getIgnoredArgPrefix(config) {
    const { argsIgnorePattern } = config;

    if (!argsIgnorePattern) {
        return null;
    }

    const m = argsIgnorePattern.toString().match(/^\/\^(\w+)\/\w?$/);

    if (!m) {
        return null;
    }

    return m[1];
}

module.exports = ruleComposer.mapReports(
    rule,
    (problem, context) => {
        const { sourceCode } = context;

        const config = getConfig(context.options);

        problem.fix = fixer => {
            const { node } = problem;
            const { parent } = node;

            if (!parent) {
                return null;
            }
            const grand = parent.parent;

            switch (parent.type) {
                case "FunctionExpression":
                case "FunctionDeclaration":
                case "ArrowFunctionExpression":

                    // Don't autofix unused functions, it's likely a mistake
                    if (parent.id === node) {
                        return null;
                    }

                    switch (config.args) {
                        case "all": {
                            const prefix = getIgnoredArgPrefix(config);

                            if (prefix === null) {
                                return null;
                            }

                            const i = node.range[0];

                            return fixer.insertTextBefore(node, prefix);
                        }
                        case "after-used": {
                            const comma = sourceCode.getTokenBefore(node, commaFilter);

                            return [fixer.remove(comma), fixer.remove(node)];
                        }
                        default:
                            throw new Error("Invalid rule config value for 'args'");
                    }

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

                    // https://github.com/aladdin-add/eslint-plugin-autofix/issues/48
                    if (!(grand && grand.type === "ObjectPattern")) {
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
