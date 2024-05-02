/**
 * @fileoverview tests for rule no-debugger
 * @author 唯然<weiran.zsd@outlook.com>
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/no-debugger");
const RuleTester = require("../../rule-tester.js").RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();

ruleTester.run("no-debugger", rule, {
    valid: [
        "var test = { debugger: 1 }; test.debugger;"
    ],
    invalid: [
        {
            code: "debugger",
            output: "",
            errors: [{ messageId: "unexpected", type: "DebuggerStatement" }]
        },
        {
            code: "if (foo) debugger",
            output: null,
            errors: [{ messageId: "unexpected", type: "DebuggerStatement" }]
        }
    ]
});
