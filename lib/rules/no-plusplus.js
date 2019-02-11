/**
 * @fileoverview add fixer to rule no-plusplus
 * @author 唯然<weiran.zsd@outlook.com>
 */
"use strict";

const ruleComposer = require("eslint-rule-composer");
const utils = require("../utils");

const rule = utils.getFixableRule("no-plusplus", true);
const fixableTypes = new Set(["ExpressionStatement", "ForStatement"]);

module.exports = ruleComposer.mapReports(
    rule,
    problem => {
        const node = problem.node;
        const op = node.operator === "++" ? "+=1" : "-=1";

        problem.fix = function(fixer) {
            return fixableTypes.has(node.parent.type)
                ? fixer.replaceText(node, `${node.argument.name}${op}`)
                : null;
        };

        return problem;
    }
);
