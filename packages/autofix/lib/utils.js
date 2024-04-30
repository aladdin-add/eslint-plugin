/**
 * @fileoverview utils used by the rule fixers.
 * @author 唯然<weiran.zsd@outlook.com>
 */
"use strict";

exports.eslintVersion = Number.parseInt(require("eslint/package.json").version, 10);

// eslint v6 restructured its codebase
// TODO: this might be unreliable
if (exports.eslintVersion >= 8) {
    const { builtinRules } = require("eslint/use-at-your-own-risk");

    exports.builtinRules = builtinRules;
} else if (exports.eslintVersion >= 6) {
    // eslint-disable-next-line n/no-missing-require
    const builtin = require("eslint/lib/rules");

    exports.builtinRules = builtin;
} else {
    const builtin = require("eslint/lib/built-in-rules-index"); // eslint-disable-line n/no-missing-require

    exports.builtinRules = builtin;
}

exports.getFixableRule = function(ruleName, recommended = false, fixable = "code") {
    const rule = exports.builtinRules[ruleName] || exports.builtinRules.get(ruleName);

    rule.meta.recommended = recommended;
    rule.meta.fixable = fixable;
    return rule;
};
