/**
 * @fileoverview Tests for rule no-eq-null.
 * @author Pig Fang <g-plane@hotmail.com>
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/no-eq-null");
const RuleTester = require("../../rule-tester.js").RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();
const errors = [{ messageId: "unexpected", type: "BinaryExpression" }];

ruleTester.run("no-eq-null", rule, {
    valid: [
        "a === null",
        "a !== null"
    ],
    invalid: [
        {
            code: "a == null",
            output: "a === null",
            errors
        },
        {
            code: "a != null",
            output: "a !== null",
            errors
        },
        {
            code: "null == a",
            output: "null === a",
            errors
        },
        {
            code: "null != a",
            output: "null !== a",
            errors
        }
    ]
});
