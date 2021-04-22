"use strict";
const _module = require("module");
const path = require("path");
const findPath = _module._findPath;
const hacks = [
    "eslint-plugin-autofix",
    "eslint-plugin-no-autofix"
];

_module._findPath = (request, paths, isMain) => {
    const r = findPath(request, paths, isMain);

    if (!r && hacks.includes(request)) {
        try {
            return require.resolve(`./node_modules/${request}`);

            // Keep the variable in place to ensure that ESLint started by older Node.js
            // versions work as expected.
            // eslint-disable-next-line no-unused-vars
        } catch (e) {
            return path.join(__dirname, `./packages/${request.slice("eslint-plugin-".length)}`);
        }
    }
    return r;
};

module.exports = {
    extends: [
        "eslint-config-eslint",
        "plugin:eslint-plugin/recommended"
    ],
    plugins: [
        "eslint-plugin",
        "eslint-plugin-autofix",
        "eslint-plugin-no-autofix"
    ],
    rules: {
        "no-autofix/eslint-plugin/test-case-shorthand-strings": "error"
    },
    overrides: [
        {
            files: ["packages/*/tests/**/*"],
            env: {
                mocha: true
            }
        }
    ]
};
