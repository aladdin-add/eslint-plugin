/**
 * @fileoverview add fixer to rule no-debugger
 * @author 唯然<weiran.zsd@outlook.com>
 */
"use strict";

const ruleComposer = require("eslint-rule-composer");
const utils = require("../utils");

const rule = utils.getFixableRule("no-debugger");

// A set of node types that can contain a list of statements
const STATEMENT_LIST_PARENTS = new Set(["Program", "BlockStatement", "SwitchCase"]);

module.exports = ruleComposer.mapReports(
    rule,
    problem => {
        problem.fix = function(fixer) {
            if (STATEMENT_LIST_PARENTS.has(problem.node.parent.type)) {
                return fixer.remove(problem.node);
            }
            return null;
        };
        return problem;
    }
);
