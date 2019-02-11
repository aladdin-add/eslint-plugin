/**
 * @fileoverview Tests for rule no-alert
 * @author Pig Fang <g-plane@hotmail.com>
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/no-alert");
const RuleTester = require("eslint").RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();

const errors = [{ messageId: "unexpected", type: "CallExpression" }];

ruleTester.run("no-alert", rule, {
    valid: [
        "alert",
        "prompt",
        "confirm"
    ],
    invalid: [
        {
            code: "alert('test')",
            output: "",
            errors
        },
        {
            code: "alert(test)",
            output: "",
            errors
        },
        {
            code: "prompt('test')",
            output: null,
            errors
        },
        {
            code: "prompt(test)",
            output: null,
            errors
        },
        {
            code: "confirm('test')",
            output: null,
            errors
        },
        {
            code: "confirm(test)",
            output: null,
            errors
        },
        {
            code: "window.alert('test')",
            output: "",
            errors
        },
        {
            code: "window.confirm('test')",
            output: null,
            errors
        },
        {
            code: "window.prompt('test')",
            output: null,
            errors
        }
    ]
});
