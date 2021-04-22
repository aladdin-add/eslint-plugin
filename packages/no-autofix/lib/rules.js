/**
 * @fileoverview expored all rules in the plugin.
 * @author 唯然<weiran.zsd@outlook.com>
 */

"use strict";

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------
const fs = require("fs");
const path = require("path");
const findUp = require("find-up");
const eslint = require("eslint");
const eslintVersion = require("eslint/package.json").version;
const linter = new eslint.Linter();
const { getNonFixableRule } = require("./utils");
const pkg = require(path.join(__dirname, "../package.json"));
const allRules = {};
const builtinRules = {};

// eslint v6 restructed its codebase
// TODO: this might be unreliable
if (eslintVersion >= "6.0.0") {
    const builtin = require("eslint/lib/rules"); // eslint-disable-line node/no-missing-require

    for (const [ruleId, rule] of builtin) {
        builtinRules[ruleId] = rule;
    }
} else {
    const builtin = require("eslint/lib/built-in-rules-index"); // eslint-disable-line node/no-missing-require

    Object.keys(builtin)
        .reduce((acc, cur) => {
            acc[cur] = builtin[cur];
            return acc;
        }, builtinRules);
}


Object.keys(builtinRules).reduce((acc, cur) => {
    const rule = linter.getRules().get(cur);

    acc[cur] = getNonFixableRule(rule);
    return acc;
}, allRules);


// support 3rd-party plugins
// TODO: find a safer way, as this is no reliable(depends on the package manager)
// TODO: support scoped package. e.g. @typescript-eslint/eslint-plugin
const root = findUp.sync("package.json", { cwd: path.join(__dirname, "../../") });
const mdir = path.join(root, "../node_modules/");
const plugins = fs.readdirSync(mdir).filter(it => /^eslint-plugin/u.test(it) && it !== pkg.name);

plugins.forEach(it => {
    const plugin = require(it);
    const pluginName = it.replace(/^eslint-plugin-/u, "");

    Object.keys(plugin.rules).forEach(rule => {
        allRules[`${pluginName}/${rule}`] = getNonFixableRule(plugin.rules[rule]);
    });
});

module.exports = allRules;
