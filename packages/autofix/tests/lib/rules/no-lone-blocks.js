/**
 * @fileoverview Tests for rule no-lone-blocks.
 * @author 唯然 <weiran.zsd@outlook.com>
 */

"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/no-lone-blocks"),
    { RuleTester } = require("eslint");

//------------------------------------------------------------------------------
// Helpers
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();

ruleTester.run("no-lone-blocks", rule, {
    valid: [
        "if (foo) { if (bar) { baz(); } }",
        "do { bar(); } while (foo)",
        "function foo() { while (bar) { baz() } }",

        // Block-level bindings
        { code: "{ let x = 1; }", parserOptions: { ecmaVersion: 6 } },
        { code: "{ const x = 1; }", parserOptions: { ecmaVersion: 6 } },
        { code: "'use strict'; { function bar() {} }", parserOptions: { ecmaVersion: 6 } },
        { code: "{ function bar() {} }", parserOptions: { ecmaVersion: 6, ecmaFeatures: { impliedStrict: true } } },
        { code: "{ class Bar {} }", parserOptions: { ecmaVersion: 6 } },

        { code: "{ {let y = 1;} let x = 1; }", parserOptions: { ecmaVersion: 6 } },
        `
          switch (foo) {
            case bar: {
              baz;
            }
          }
        `,
        `
          switch (foo) {
            case bar: {
              baz;
            }
            case qux: {
              boop;
            }
          }
        `,
        `
          switch (foo) {
            case bar:
            {
              baz;
            }
          }
        `,
        { code: "function foo() { { const x = 4 } const x = 3 }", parserOptions: { ecmaVersion: 6 } }
    ],
    invalid: [
        {
            code: "{}",
            output: "",
            errors: [{
                messageId: "redundantBlock",
                type: "BlockStatement"
            }]
        },
        {
            code: "{var x = 1;}",
            output: "var x = 1;",
            errors: [{
                messageId: "redundantBlock",
                type: "BlockStatement"
            }]
        },
        {
            code: "foo(); {} bar();",
            output: "foo();  bar();",
            errors: [{
                messageId: "redundantBlock",
                type: "BlockStatement"
            }]
        },
        {
            code: "if (foo) { bar(); {} baz(); }",
            output: "if (foo) { bar();  baz(); }",
            errors: [{
                messageId: "redundantNestedBlock",
                type: "BlockStatement"
            }]
        },
        {
            code: "{ \n{ } }",
            output: " \n{ } ",
            errors: [
                {
                    messageId: "redundantBlock",
                    type: "BlockStatement",
                    line: 1
                },
                {
                    messageId: "redundantNestedBlock",
                    type: "BlockStatement",
                    line: 2
                }
            ]
        },
        {
            code: "function foo() { bar(); {} baz(); }",
            output: "function foo() { bar();  baz(); }",
            errors: [{
                messageId: "redundantNestedBlock",
                type: "BlockStatement"
            }]
        },
        {
            code: "while (foo) { {} }",
            output: "while (foo) {  }",
            errors: [{
                messageId: "redundantNestedBlock",
                type: "BlockStatement"
            }]
        },

        // Non-block-level bindings, even in ES6
        {
            code: "{ function bar() {} }",
            output: " function bar() {} ",
            parserOptions: { ecmaVersion: 6 },
            errors: [{
                messageId: "redundantBlock",
                type: "BlockStatement"
            }]
        },
        {
            code: "{var x = 1;}",
            output: "var x = 1;",
            parserOptions: { ecmaVersion: 6 },
            errors: [{
                messageId: "redundantBlock",
                type: "BlockStatement"
            }]
        },

        {
            code: "{ \n{var x = 1;}\n let y = 2; } {let z = 1;}",
            output: "{ \nvar x = 1;\n let y = 2; } {let z = 1;}",
            parserOptions: { ecmaVersion: 6 },
            errors: [{
                messageId: "redundantNestedBlock",
                type: "BlockStatement",
                line: 2
            }]
        }
    ]
});
