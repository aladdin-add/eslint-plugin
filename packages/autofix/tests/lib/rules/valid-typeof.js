/**
 * @fileoverview Tests for rule valid-typeof
 * @author Pig Fang <g-plane@hotmail.com>
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/valid-typeof");
const RuleTester = require("../../rule-tester.js").RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();
const errors = [{ messageId: "invalidValue", type: "Literal" }];

ruleTester.run("valid-typeof", rule, {
    valid: [
        "typeof a === 'string'"
    ],
    invalid: [
        {
            code: "typeof a === 'strnig'",
            output: "typeof a === \"string\"",
            errors
        },
        {
            code: "'strnig' === typeof a",
            output: "\"string\" === typeof a",
            errors
        },
        {
            code: "typeof a === `strnig`",
            output: "typeof a === \"string\"",
            errors: [{ messageId: "invalidValue", type: "TemplateLiteral" }]
        },
        {
            code: "typeof a === 'nunber'",
            output: "typeof a === \"number\"",
            errors
        },
        {
            code: "typeof a === 'fucntion'",
            output: "typeof a === \"function\"",
            errors
        },
        {
            code: "typeof a === 'undefimed'",
            output: "typeof a === \"undefined\"",
            errors
        },
        {
            code: "typeof a === 'biilean'",
            output: "typeof a === \"boolean\"",
            errors
        }
    ]
});
