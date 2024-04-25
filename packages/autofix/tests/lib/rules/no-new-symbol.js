/**
 * @fileoverview Tests for rule no-new-symbol
 * @author Pig Fang <g-plane@hotmail.com>
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/no-new-symbol");
const RuleTester = require("eslint").RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();
const errors = 1;

ruleTester.run("no-new-symbol", rule, {
    valid: [
        "Symbol('a')"
    ],
    invalid: [
        {
            code: "new Symbol('a')",
            output: "Symbol('a')",
            errors
        }
    ]
});
