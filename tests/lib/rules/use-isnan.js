/**
 * @fileoverview Tests for rule use-isnan
 * @author Pig Fang <g-plane@hotmail.com>
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/use-isnan");
const RuleTester = require("eslint").RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();

const errors = [{ messageId: "useIsNaN", type: "BinaryExpression" }];

ruleTester.run("use-isnan", rule, {
    valid: [
        "isNaN(foo)",
        "!isNaN(foo)",
        "Number.isNaN(foo)",
        "!Number.isNaN(foo)"
    ],
    invalid: [
        {
            code: "foo == NaN",
            output: "isNaN(foo)",
            errors
        },
        {
            code: "foo === NaN",
            output: "isNaN(foo)",
            errors
        },
        {
            code: "foo != NaN",
            output: "!isNaN(foo)",
            errors
        },
        {
            code: "foo !== NaN",
            output: "!isNaN(foo)",
            errors
        }
    ]
});
