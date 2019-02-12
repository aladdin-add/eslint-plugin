/**
 * @fileoverview Tests for rule no-template-curly-in-string
 * @author Pig Fang <g-plane@hotmail.com>
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/no-template-curly-in-string");
const RuleTester = require("eslint").RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({ parserOptions: { ecmaVersion: 6 } });

ruleTester.run("no-template-curly-in-string", rule, {
    valid: [
        "`${a}`"
    ],
    invalid: [
        {
            code: "'${a}'",
            output: "`${a}`",
            errors: [{ type: "Literal" }]
        }
    ]
});
