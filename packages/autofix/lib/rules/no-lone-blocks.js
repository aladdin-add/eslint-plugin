/**
 * @fileoverview Add fixer to rule no-lone-blocks.
 * @author 唯然 <weiran.zsd@outlook.com>
 */
"use strict";

const ruleComposer = require("eslint-rule-composer");
const utils = require("../utils");

const rule = utils.getFixableRule("no-lone-blocks", false);

module.exports = ruleComposer.mapReports(
    rule,
    (problem, metadata) => {
        problem.fix = fixer => [
            fixer.remove(metadata.sourceCode.getFirstToken(problem.node)),
            fixer.remove(metadata.sourceCode.getLastToken(problem.node))
        ];

        return problem;
    }
);
