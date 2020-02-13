/**
 * @fileoverview expored all rules in the plugin.
 * @author 唯然<weiran.zsd@outlook.com>
 */

"use strict";

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------
const { getBuiltinRules, getNonFixableRule } = require("./utils");
const builtinRules = getBuiltinRules();

const allRules = {};

Object.keys(builtinRules).reduce((acc, cur) => {
    acc[cur] = getNonFixableRule(cur);
    return acc;
}, allRules);


// use a proxy to support 3rd party plugin
const proxy = new Proxy({}, {
    get(trapTarget, key) {
        return getNonFixableRule(key);
    }
});

module.exports = {
    allRules,
    proxy
};
