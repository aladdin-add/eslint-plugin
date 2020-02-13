/**
 * @fileoverview utils used by the rule fixers.
 * @author 唯然<weiran.zsd@outlook.com>
 */
"use strict";
const eslint = require("eslint");
const eslintVersion = require("eslint/package.json").version;
const ruleComposer = require("eslint-rule-composer");

const linter = new eslint.Linter();
const builtinRules = linter.getRules();
const loadedPlugins = Object.create(null);

// copied from "eslint/lib/shared/naming"
// to support eslint v5.(it was introduced in eslint 6.0)
/**
 * Brings package name to correct format based on prefix
 * @param {string} name The name of the package.
 * @param {string} prefix Can be either "eslint-plugin", "eslint-config" or "eslint-formatter"
 * @returns {string} Normalized name of the package
 * @private
 */
function normalizePackageName(name, prefix) {
    let normalizedName = name;

    /**
     * On Windows, name can come in with Windows slashes instead of Unix slashes.
     * Normalize to Unix first to avoid errors later on.
     * https://github.com/eslint/eslint/issues/5644
     */
    if (normalizedName.includes("\\")) {
        normalizedName = normalizedName.replace(/\\/gu, "/");
    }

    if (normalizedName.charAt(0) === "@") {

        /**
         * it's a scoped package
         * package name is the prefix, or just a username
         */
        const scopedPackageShortcutRegex = new RegExp(`^(@[^/]+)(?:/(?:${prefix})?)?$`, "u"),
            scopedPackageNameRegex = new RegExp(`^${prefix}(-|$)`, "u");

        if (scopedPackageShortcutRegex.test(normalizedName)) {
            normalizedName = normalizedName.replace(scopedPackageShortcutRegex, `$1/${prefix}`);
        } else if (!scopedPackageNameRegex.test(normalizedName.split("/")[1])) {

            /**
             * for scoped packages, insert the prefix after the first / unless
             * the path is already @scope/eslint or @scope/eslint-xxx-yyy
             */
            normalizedName = normalizedName.replace(/^@([^/]+)\/(.*)$/u, `@$1/${prefix}-$2`);
        }
    } else if (!normalizedName.startsWith(`${prefix}-`)) {
        normalizedName = `${prefix}-${normalizedName}`;
    }

    return normalizedName;
}

exports.getNonFixableRule = function(key) {
    const isBuiltinRule = /^[a-zA-Z-]+$/u.test(key);
    let rule = null;

    if (isBuiltinRule) {
        rule = builtinRules.get(key);
    } else {
        const match = /(@[\w-]+[/])?([\w-]+)[/](.+)/u.exec(key);
        const [, scope = "", pluginName, ruleName] = match;
        const fullPluginName = normalizePackageName(scope + pluginName, "eslint-plugin");
        const plugin = loadedPlugins[fullPluginName] || require(fullPluginName);

        rule = plugin.rules[ruleName];
    }

    if (!rule) {
        throw new Error("ESLint rule 'key' was not found, please check its existence.");
    }

    return ruleComposer.mapReports(
        Object.create(rule),
        problem => (problem.fix = null, problem) // eslint-disable-line
    );
};


exports.getBuiltinRules = function() {
    const rules = {};

    // eslint v6 restructed its codebase
    // TODO: this might be unreliable
    if (eslintVersion >= "6.0.0") {
        const builtin = require("eslint/lib/rules"); // eslint-disable-line node/no-missing-require

        for (const [ruleId, rule] of builtin) {
            rules[ruleId] = rule;
        }
    } else {
        const builtin = require("eslint/lib/built-in-rules-index"); // eslint-disable-line node/no-missing-require

        Object.keys(builtin)
            .reduce((acc, cur) => {
                acc[cur] = builtin[cur];
                return acc;
            }, rules);
    }
    return rules;
};
