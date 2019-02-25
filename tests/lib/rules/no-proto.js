/**
 * @fileoverview Tests for rule no-proto.
 * @author Pig Fang <g-plane@hotmail.com>
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/no-proto");
const RuleTester = require("eslint").RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();
const errors = [{ type: "MemberExpression" }];

ruleTester.run("no-proto", rule, {
    valid: [
        "Object.getPrototypeOf(obj)"
    ],
    invalid: [
        {
            code: "obj.__proto__",
            output: "Object.getPrototypeOf(obj)",
            errors
        },
        {
            code: "obj['__proto__']",
            output: "Object.getPrototypeOf(obj)",
            errors
        }
    ]
});
