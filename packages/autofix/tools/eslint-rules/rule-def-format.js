/**
 * @fileoverview Rule definition of "rule-def-format"
 * @author Pig Fang <g-plane@hotmail.com>
 */
"use strict";

const path = require("path");

module.exports = {
    meta: {
        fixable: "code"
    },
    create: context => ({
        CallExpression: node => {
            if (node.callee.type !== "MemberExpression") {
                return;
            }

            const { callee: { object: { name: objectName }, property: { name: propertyName } }, arguments: args } = node;
            const sourceCode = context.getSourceCode();

            if (objectName === "utils" && propertyName === "getFixableRule") {
                const arg0 = args[0];
                const ruleName = path.basename(context.getFilename(), ".js");

                if (arg0.value !== ruleName) {
                    context.report({
                        node: arg0,
                        message: `Rule name should be '${ruleName}'`,
                        fix: fixer => fixer.replaceText(arg0, `"${ruleName}"`)
                    });
                }
                return;
            }

            if (objectName === "ruleComposer") {
                if (propertyName === "mapReports") {
                    const [, predicate] = args;

                    if (predicate.type === "ArrowFunctionExpression" || predicate.type === "FunctionExpression") {
                        if (predicate.body.type !== "BlockStatement") {
                            context.report({
                                node: predicate.body,
                                message: "Body of predicate should be a block statement."
                            });
                            return;
                        }
                        const param0 = predicate.params[0].name;

                        const statements = predicate.body.body;

                        const returnStatement = statements.find(stmt => stmt.type === "ReturnStatement");

                        if (!returnStatement) {
                            context.report({
                                node: predicate,
                                message: "Should returning the problem object.",
                                fix: fixer => {
                                    const lastToken = sourceCode.getLastToken(predicate);

                                    return fixer.insertTextBefore(lastToken, `\nreturn ${param0};\n`);
                                }
                            });
                        } else if (returnStatement.argument.name !== param0) {
                            context.report({
                                node: predicate,
                                message: "Should returning the problem object.",
                                fix: fixer => fixer.replaceText(returnStatement, `return ${param0};`)
                            });
                        }
                    }
                } else if (propertyName === "joinReports" && args[0].type !== "ArrayExpression") {
                    context.report({
                        node: args[0],
                        message: "The first argument of 'joinReports' should be an array."
                    });
                }
            }
        }
    })
};
