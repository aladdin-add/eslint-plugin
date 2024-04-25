import baseConfig from "eslint-config-eslint";
import eslintPlugin from "eslint-plugin-eslint-plugin";
import autofixPlugin from "eslint-plugin-autofix";
import noAutofixPlugin from "eslint-plugin-no-autofix";
import nPlugin from "eslint-plugin-n"; // eslint-disable-line n/no-extraneous-import
import globals from "globals";

export default [
    ...baseConfig,
    eslintPlugin.configs["flat/recommended"],
    { files: ["packages/*/tests/**/*"], languageOptions: { globals: globals.mocha } },
    {
        plugins: { autofix: autofixPlugin, "no-autofix": noAutofixPlugin },
        rules: { "eslint-comments/require-description": 0, "no-autofix/eslint-plugin/test-case-shorthand-strings": "error" }
    },
    ...nPlugin.configs["flat/mixed-esm-and-cjs"]
];
