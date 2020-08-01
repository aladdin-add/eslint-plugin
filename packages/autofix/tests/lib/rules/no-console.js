/**
 * @fileoverview Tests for rule "no-console"
 * @author Pig Fang <g-plane@hotmail.com>
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/no-console");
const RuleTester = require("eslint").RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();

ruleTester.run("no-console", rule, {
    valid: [
        "console;",
        "if (true) console;"
    ],
    invalid: [
        {
            code: "console.log",
            output: "console.log",
            errors: [{ messageId: "unexpected", type: "MemberExpression" }]
        },
        {
            code: "console.log()",
            output: "",
            errors: [{ messageId: "unexpected", type: "MemberExpression" }]
        },

        {
            code: "if (true) console.log()",
            output: null,
            errors: [{ messageId: "unexpected", type: "MemberExpression" }]
        },
        {
            code: "if (true) { console.log() }",
            output: "if (true) {  }",
            errors: [{ messageId: "unexpected", type: "MemberExpression" }]
        },
        {
            code: "console.log(foo)",
            output: "",
            errors: [{ messageId: "unexpected", type: "MemberExpression" }]
        },
        {
            code: "console.log(233)",
            output: "",
            errors: [{ messageId: "unexpected", type: "MemberExpression" }]
        },
        {
            code: "console.log(foo())",
            output: "",
            errors: [{ messageId: "unexpected", type: "MemberExpression" }]
        },
        {
            code: "var log = console.log",
            output: null,
            errors: [{ messageId: "unexpected", type: "MemberExpression" }]
        }
    ]
});
