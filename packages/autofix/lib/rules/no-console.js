/**
 * @fileoverview Add fixer to rule "no-console"
 * @author Pig Fang <g-plane@hotmail.com>
 */
"use strict";

const ruleComposer = require("eslint-rule-composer");
const utils = require("../utils");
const { STATEMENT_LIST_PARENTS } = require("../ast-utils");

const rule = utils.getFixableRule("no-console", true);

module.exports = ruleComposer.mapReports(
    rule,
    problem => {
        problem.fix = function(fixer) {
            const ppparent = problem.node.type === "MemberExpression" &&
                problem.node.parent.type === "CallExpression" &&
                problem.node.parent.parent.parent;

            if (STATEMENT_LIST_PARENTS.has(ppparent && ppparent.type)) {
                return fixer.remove(problem.node.parent);
            }

            return null;
        };
        return problem;
    }
);
