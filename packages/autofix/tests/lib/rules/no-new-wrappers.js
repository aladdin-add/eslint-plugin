/**
 * @fileoverview Tests for rule no-new-native-nonconstructor
 * @author SukkaW <github@skk.moe>
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/no-new-wrappers.js");
const RuleTester = require("../../rule-tester.js").RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();

ruleTester.run("no-new-wrappers", rule, {
    valid: [
        "const text = String(someValue);",
        "const num = Number(someValue);",
        "const object = new MyString();"
    ],
    invalid: [
        {
            code: 'const stringObject = new String("Hello world");',
            output: 'const stringObject = String("Hello world");',
            errors: 1
        },
        {
            code: "const numberObject = new Number(0x721);",
            output: "const numberObject = Number(0x721);",
            errors: 1
        },
        {
            code: "const booleanObject = new Boolean(false);",
            output: "const booleanObject = Boolean(false);",
            errors: 1
        },

        // no auto fix
        {
            code: "const stringObject = new String",
            output: null,
            errors: 1
        },
        {
            code: "const numberObject = new Number",
            output: null,
            errors: 1
        },
        {
            code: "const booleanObject = new Boolean",
            output: null,
            errors: 1
        }
    ]
});
