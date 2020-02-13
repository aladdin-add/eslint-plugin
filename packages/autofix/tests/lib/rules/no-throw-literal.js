/**
 * @fileoverview Tests for rule no-throw-literal.
 * @author Pig Fang <g-plane@hotmail.com>
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/no-throw-literal");
const RuleTester = require("eslint").RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();
const errors = [{ type: "ThrowStatement" }];

ruleTester.run("no-throw-literal", rule, {
    valid: [
        "throw new Error()",
        "throw error"
    ],
    invalid: [
        {
            code: "throw 'error'",
            output: "throw new Error('error');",
            errors
        },
        {
            code: "throw ''",
            output: "throw new Error('');",
            errors
        },
        {
            code: "throw 0",
            output: "throw new Error(0);",
            errors
        }
    ]
});
