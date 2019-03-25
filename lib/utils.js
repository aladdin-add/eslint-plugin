/**
 * @fileoverview utils used by the rule fixers.
 * @author 唯然<weiran.zsd@outlook.com>
 */
"use strict";
const eslint = require("eslint");
const linter = new eslint.Linter();

exports.getFixableRule = function(ruleName, recommended = false, fixable = "code") {
    const rule = linter.getRules().get(ruleName);

    rule.meta.recommended = recommended;
    rule.meta.fixable = fixable;
    return rule;
};

/**
 * Gets the key name of a Property, if it can be determined statically.
 * @param {ASTNode} property The `Property` node
 * @returns {string|null} The key name, or `null` if the name cannot be determined statically.
 */
exports.getKeyName = function(property) {
    if (!property.computed && property.key.type === "Identifier") {
        return property.key.name;
    }
    if (property.key.type === "Literal") {
        return `${property.key.value}`;
    }
    if (property.key.type === "TemplateLiteral" && property.key.quasis.length === 1) {
        return property.key.quasis[0].value.cooked;
    }
    return null;
};
