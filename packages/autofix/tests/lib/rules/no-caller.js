/**
 * @fileoverview Tests for rule no-caller.
 * @author Pig Fang <g-plane@hotmail.com>
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/no-caller");
const RuleTester = require("eslint").RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();
const errors = 1;

ruleTester.run("no-caller", rule, {
    valid: [
        "function foo() { foo(); }"
    ],
    invalid: [
        {
            code: "function foo() { arguments.caller }",
            output: null,
            errors
        },
        {
            code: "arguments.callee",
            output: null,
            errors
        },
        {
            code: "var foo = function () { arguments.callee }",
            output: null,
            errors
        },
        {
            code: "var foo = () => { arguments.callee }",
            output: null,
            errors
        },
        {
            code: "function foo() { arguments.callee }",
            output: "function foo() { foo }",
            errors
        },
        {
            code: "var foo = function foo() { arguments.callee }",
            output: "var foo = function foo() { foo }",
            errors
        }
    ]
});
