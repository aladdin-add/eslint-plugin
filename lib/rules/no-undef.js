/**
 * @fileoverview Add fixer to rule "no-undef"
 * @author Pig Fang <g-plane@hotmail.com>
 */
"use strict";

const ruleComposer = require("eslint-rule-composer");
const utils = require("../utils");
const stringSimilarity = require("string-similarity");

const rule = utils.getFixableRule("no-undef");

const declared = new Set();

module.exports = ruleComposer.joinReports([
    rule,
    context => ({
        Program: node => node.body.forEach(
            statement => context.getDeclaredVariables(statement).forEach(variable => declared.add(variable.name))
        ),
        "Program:exit": () => declared.clear()
    })
]);

module.exports = ruleComposer.mapReports(
    module.exports,
    problem => {
        const { node: { name } } = problem;
        const candidate = Array.from(declared.values());

        if (candidate.length === 0) {
            return problem;
        }

        const result = stringSimilarity.findBestMatch(name, candidate);

        if (result.bestMatch.rating < 0.25) {
            return problem;
        }

        const best = result.bestMatch.target;

        problem.fix = fixer => fixer.replaceText(problem.node, best);
        problem.message += ` Do you mean '${best}'?`;
        return problem;
    }
);
