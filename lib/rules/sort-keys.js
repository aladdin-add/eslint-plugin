/**
 * @fileoverview Add fixer to rule sort-keys.
 * @author weiran.zsd <weiran.zsd@alibaba-inc.com>
 */
"use strict";

const ruleComposer = require("eslint-rule-composer");
const utils = require("../utils");

const rule = utils.getFixableRule("sort-keys", false);

module.exports = ruleComposer.mapReports(
    rule,
    problem => {
        problem.fix = fixer => {
            const { node, data } = problem;
            const properties = node.parent.properties;
            const keys = properties.map(utils.getKeyName);
            const idx = keys.indexOf(data.thisName);

            const prev = properties[idx - 1];
            const cur = properties[idx];
            const range = [prev.loc.start, cur.loc.end];

            return fixer.replaceTextRange(range, `${cur.value}, ${prev.value}`);
        };
        return problem;
    }
);
