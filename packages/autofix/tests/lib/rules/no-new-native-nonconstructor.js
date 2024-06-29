/**
 * @fileoverview Tests for rule no-new-native-nonconstructor
 * @author SukkaW <github@skk.moe>
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/no-new-native-nonconstructor.js");
const RuleTester = require("../../rule-tester.js").RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();

ruleTester.run("no-new-native-nonconstructor", rule, {
    valid: [
        "Symbol('a')",
        "BigInt(42)"
    ],
    invalid: [
        {
            code: "new Symbol('a')",
            output: "Symbol('a')",
            errors: 1
        },
        {
            code: "new BigInt(0x721)",
            output: "BigInt(0x721)",
            errors: 1
        }
    ]
});
