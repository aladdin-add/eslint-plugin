/**
 * @fileoverview export all rules in the plugin.
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
const eslintVersion = Number.parseInt(require("eslint/package.json").version, 10);
const linter = new eslint.Linter();
const { getNonFixableRule } = require("./utils");
const pkg = require(path.join(__dirname, "../package.json"));
const allRules = {};
const builtinRules = {};

if (eslintVersion >= 8) {
    const { builtinRules: rules } = require("eslint/use-at-your-own-risk"); // eslint-disable-line node/no-missing-require

    for (const [ruleId, rule] of rules) {
        builtinRules[ruleId] = rule;
    }
} else if (eslintVersion >= 6) {
    const builtin = require("eslint/lib/rules"); // eslint-disable-line node/no-missing-require

    for (const [ruleId, rule] of builtin) {
        builtinRules[ruleId] = rule;
    }
} else {
    const builtin = require("eslint/lib/built-in-rules-index"); // eslint-disable-line n/no-missing-require

    Object.keys(builtin)
        .reduce((acc, cur) => {
            acc[cur] = builtin[cur];
            return acc;
        }, builtinRules);
}


Object.keys(builtinRules).reduce((acc, cur) => {
    const rule = builtinRules[cur] || builtinRules.get(cur);

    acc[cur] = getNonFixableRule(rule);
    return acc;
}, allRules);


// support 3rd-party plugins
// TODO: find a safer way, as this is no reliable(depends on the package managers)
// TODO: lazy loading 3rd-party plugins
const root = findUp.sync("package.json", { cwd: path.join(__dirname, "../../") });
const mdir = path.join(root, "../node_modules/");
const plugins = [];

const allModules = fs.readdirSync(mdir);
const eslintPluginRegex = /^eslint-plugin/u;

// find eslint-plugin-xxx
allModules.forEach(it => eslintPluginRegex.test(it) && it !== pkg.name && plugins.push(it));

// find @foo/eslint-plugin-xxx
allModules.filter(it => it.startsWith("@")).forEach(it => {
    const pkgs = fs.readdirSync(path.join(mdir, it));

    pkgs.forEach(_pkg => eslintPluginRegex.test(_pkg) && plugins.push(`${it}/${_pkg}`));
});

plugins.forEach(it => {
    const plugin = require(it);
    const pluginName = it.replace(/eslint-plugin(-?)/u, "").replace(/\/\//u, "").replace(/\/$/u, "");

    Object.keys(plugin.rules || {}).forEach(rule => {
        allRules[`${pluginName}/${rule}`] = getNonFixableRule(plugin.rules[rule]);
    });
});

module.exports = allRules;
