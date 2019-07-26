/**
 * @fileoverview Tests for no-plusplus.
 * @author 唯然<weiran.zsd@outlook.com>
 */

"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/no-plusplus"),
    RuleTester = require("eslint").RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();

ruleTester.run("no-plusplus", rule, {
    valid: [
        "var foo = 0; foo=+1;",

        // With "allowForLoopAfterthoughts" allowed
        { code: "var foo = 0; foo=+1;", options: [{ allowForLoopAfterthoughts: true }] },
        { code: "for (i = 0; i < l; i++) { console.log(i); }", options: [{ allowForLoopAfterthoughts: true }] }
    ],

    invalid: [
        {
            code: "var foo = 0; foo++;",
            output: "var foo = 0; foo+=1;",
            errors: [{ message: "Unary operator '++' used.", type: "UpdateExpression" }]
        },
        {
            code: "var foo = 0; foo--;",
            output: "var foo = 0; foo-=1;",
            errors: [{ message: "Unary operator '--' used.", type: "UpdateExpression" }]
        },
        {
            code: "for (i = 0; i < l; i++) { console.log(i); }",
            output: "for (i = 0; i < l; i+=1) { console.log(i); }",
            errors: [{ message: "Unary operator '++' used.", type: "UpdateExpression" }]
        },

        // With "allowForLoopAfterthoughts" allowed
        {
            code: "var foo = 0; foo++;",
            output: "var foo = 0; foo+=1;",
            options: [{ allowForLoopAfterthoughts: true }],
            errors: [{ message: "Unary operator '++' used.", type: "UpdateExpression" }]
        },
        {
            code: "for (i = 0; i < l; i++) { v++; }",
            output: "for (i = 0; i < l; i++) { v+=1; }",
            options: [{ allowForLoopAfterthoughts: true }],
            errors: [{ message: "Unary operator '++' used.", type: "UpdateExpression" }]
        },
        {
            code: "var bar = foo++;",
            output: null,
            errors: [{ message: "Unary operator '++' used.", type: "UpdateExpression" }]
        }
    ]
});
