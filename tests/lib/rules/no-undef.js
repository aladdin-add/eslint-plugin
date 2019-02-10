/**
 * @fileoverview Tests for rule "no-undef"
 * @author Pig Fang <g-plane@hotmail.com>
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/no-undef");
const RuleTester = require("eslint").RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();

ruleTester.run("no-undef", rule, {
    valid: [
        "var test"
    ],
    invalid: [
        {
            code: "var test; text",
            output: "var test; test",
            errors: [{ messageId: "undef", type: "Identifier" }]
        },
        {
            code: "test",
            output: null,
            errors: [{ messageId: "undef", type: "Identifier" }]
        },
        {
            code: "var test; tt",
            output: null,
            errors: [{ messageId: "undef", type: "Identifier" }]
        }
    ]
});
