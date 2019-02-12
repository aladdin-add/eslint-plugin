/**
 * @fileoverview add fixer to rule no-template-curly-in-string.
 * @author Pig Fang<g-plane@hotmail.com>
 */
"use strict";

const ruleComposer = require("eslint-rule-composer");
const utils = require("../utils");

const rule = utils.getFixableRule("no-template-curly-in-string");

module.exports = ruleComposer.mapReports(
    rule,
    problem => {
        problem.fix = fixer => fixer.replaceText(problem.node, `\`${problem.node.value}\``);
        return problem;
    }
);
