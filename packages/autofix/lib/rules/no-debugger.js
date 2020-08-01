/**
 * @fileoverview add fixer to rule no-debugger
 * @author 唯然<weiran.zsd@outlook.com>
 */
"use strict";

const ruleComposer = require("eslint-rule-composer");
const utils = require("../utils");
const { STATEMENT_LIST_PARENTS } = require("../ast-utils");

const rule = utils.getFixableRule("no-debugger", true);

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
