/**
 * @fileoverview Tests for rule no-unused-vars.
 * @author Pig Fang <g-plane@hotmail.com>
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/no-unused-vars");
const RuleTester = require("eslint").RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();

ruleTester.run("no-unused-vars", rule, {
    valid: [
        {
            code: "import 'm'",
            parserOptions: { sourceType: "module", ecmaVersion: 6 }
        }
    ],
    invalid: [
        {
            code: "import * as m from 'm'",
            parserOptions: { sourceType: "module", ecmaVersion: 6 },
            output: "",
            errors: [{ type: "Identifier" }]
        },
        {
            code: "import m from 'm'",
            parserOptions: { sourceType: "module", ecmaVersion: 6 },
            output: "",
            errors: [{ type: "Identifier" }]
        },
        {
            code: "import {m} from 'm'",
            parserOptions: { sourceType: "module", ecmaVersion: 6 },
            output: "",
            errors: [{ type: "Identifier" }]
        },
        {
            code: "import {m1 as m2} from 'm'",
            parserOptions: { sourceType: "module", ecmaVersion: 6 },
            output: "",
            errors: [{ type: "Identifier" }]
        },
        {
            code: "import m, {b} from 'm'; b;",
            parserOptions: { sourceType: "module", ecmaVersion: 6 },
            output: "import  {b} from 'm'; b;",
            errors: [{ type: "Identifier" }]
        },
        {
            code: "import {a, b} from 'm'; b;",
            parserOptions: { sourceType: "module", ecmaVersion: 6 },
            output: "import { b} from 'm'; b;",
            errors: [{ type: "Identifier" }]
        },
        {
            code: "import {a1 as a2, b} from 'm'; b;",
            parserOptions: { sourceType: "module", ecmaVersion: 6 },
            output: "import { b} from 'm'; b;",
            errors: [{ type: "Identifier" }]
        },
        {
            code: "import {a, b} from 'm'; a;",
            parserOptions: { sourceType: "module", ecmaVersion: 6 },
            output: "import {a} from 'm'; a;",
            errors: [{ type: "Identifier" }]
        },
        {
            code: "import m, {a} from 'm'; m;",
            parserOptions: { sourceType: "module", ecmaVersion: 6 },
            output: "import m from 'm'; m;",
            errors: [{ type: "Identifier" }]
        },
        {
            code: "var a",
            output: "",
            errors: [{ type: "Identifier" }]
        },
        {
            code: "var a = b",
            output: "",
            errors: [{ type: "Identifier" }]
        },
        {
            code: "var a = undefined",
            output: "",
            errors: [{ type: "Identifier" }]
        },
        {
            code: "var a = null",
            output: "",
            errors: [{ type: "Identifier" }]
        },
        {
            code: "var a = 'b'",
            output: "",
            errors: [{ type: "Identifier" }]
        },
        {
            code: "var a = this",
            output: "",
            errors: [{ type: "Identifier" }]
        },
        {
            code: "var a = `template`",
            parserOptions: { ecmaVersion: 6 },
            output: "",
            errors: [{ type: "Identifier" }]
        },
        {
            code: "var a = this.value",
            output: "",
            errors: [{ type: "Identifier" }]
        },
        {
            code: "var a = b = c",
            output: null,
            errors: [{ type: "Identifier" }]
        },
        {
            code: "var a = b = c()",
            output: null,
            errors: [{ type: "Identifier" }]
        },
        {
            code: "var a = `template-${value}`",
            parserOptions: { ecmaVersion: 6 },
            output: null,
            errors: [{ type: "Identifier" }]
        },
        {
            code: "var a = b()",
            output: null,
            errors: [{ type: "Identifier" }]
        },
        {
            code: "var a = (b()).c",
            output: null,
            errors: [{ type: "Identifier" }]
        },
        {
            code: "var [a] = c",
            output: "var [] = c",
            parserOptions: { ecmaVersion: 6 },
            errors: [{ type: "Identifier" }]
        },
        {
            code: "var [a, b] = c",
            output: "var [, ] = c",
            parserOptions: { ecmaVersion: 6 },
            errors: [{ type: "Identifier" }, { type: "Identifier" }]
        },
        {
            code: "var [a, b] = c; a;",
            output: "var [a, ] = c; a;",
            parserOptions: { ecmaVersion: 6 },
            errors: [{ type: "Identifier" }]
        },
        {
            code: "var [a, b] = c; b;",
            output: "var [, b] = c; b;",
            parserOptions: { ecmaVersion: 6 },
            errors: [{ type: "Identifier" }]
        },
        {
            code: "var a = b, c = d; c;",
            output: "var  c = d; c;",
            errors: [{ type: "Identifier" }]
        },
        {
            code: "var a = b, c = d; a;",
            output: "var a = b ; a;",
            errors: [{ type: "Identifier" }]
        },
        {
            code: "let {...a} = b",
            output: "let {} = b",
            parserOptions: { ecmaVersion: 2018 },
            errors: [{ type: "Identifier" }]
        },
        {
            code: "function foo(...args){}",
            output: null,
            parserOptions: { ecmaVersion: 2018 },
            errors: [{ type: "Identifier" }, { type: "Identifier" }]
        },
        {
            code: "function foo(a, b, c){console.log(b);}; foo(1, 2, 3);",
            output: "function foo(a, b ){console.log(b);}; foo(1, 2, 3);",
            parserOptions: { ecmaVersion: 2018 },
            errors: [
                { type: "Identifier" }
            ],
            options: [{
                args: "after-used",
                argsIgnorePattern: "^_"
            }]
        },
        {
            code: "const foo = function(a, b, c) {console.log(b);}; foo(1, 2, 3);",
            output: "const foo = function(a, b ) {console.log(b);}; foo(1, 2, 3);",
            parserOptions: { ecmaVersion: 2018 },
            errors: [
                { type: "Identifier" }
            ],
            options: [{
                args: "after-used",
                argsIgnorePattern: "^_"
            }]
        },
        {
            code: "const foo = (a, b, c) => {console.log(b);}; foo(1, 2, 3);",
            output: "const foo = (a, b ) => {console.log(b);}; foo(1, 2, 3);",
            parserOptions: { ecmaVersion: 2018 },
            errors: [
                { type: "Identifier" }
            ],
            options: [{
                args: "after-used",
                argsIgnorePattern: "^_"
            }]
        },
        {
            code: "function foo(a, b, c){console.log(b);}; foo(1, 2, 3);",
            output: "function foo(_a, b, _c){console.log(b);}; foo(1, 2, 3);",
            parserOptions: { ecmaVersion: 2018 },
            errors: [
                { type: "Identifier" },
                { type: "Identifier" }
            ],
            options: [{
                args: "all",
                argsIgnorePattern: "^_"
            }]
        },
        {
            code: "function foo(a, b, c){console.log(b);}; foo(1, 2, 3);",
            output: "function foo(a, b, c){console.log(b);}; foo(1, 2, 3);",
            parserOptions: { ecmaVersion: 2018 },
            errors: [
                { type: "Identifier" },
                { type: "Identifier" }
            ],
            options: [{
                args: "all",
                argsIgnorePattern: "_$"
            }]
        },
        {
            code: "let {a} = b",
            output: "let {} = b",
            parserOptions: { ecmaVersion: 6 },
            errors: [{ type: "Identifier" }]
        },
        {
            code: "let {a,} = b",
            output: "let {} = b",
            parserOptions: { ecmaVersion: 6 },
            errors: [{ type: "Identifier" }]
        },
        {
            code: "let {a1: a2} = b",
            output: "let {} = b",
            parserOptions: { ecmaVersion: 6 },
            errors: [{ type: "Identifier" }]
        },
        {
            code: "let {a = b} = c",
            output: "let {} = c",
            parserOptions: { ecmaVersion: 6 },
            errors: [{ type: "Identifier" }]
        },
        {
            code: "let {a = b()} = c",
            output: null,
            parserOptions: { ecmaVersion: 6 },
            errors: [{ type: "Identifier" }]
        },
        {
            code: "let {a, b} = c; b;",
            output: "let { b} = c; b;",
            parserOptions: { ecmaVersion: 6 },
            errors: [{ type: "Identifier" }]
        },
        {
            code: "let {a, b} = c; a;",
            output: "let {a } = c; a;",
            parserOptions: { ecmaVersion: 6 },
            errors: [{ type: "Identifier" }]
        }
    ]
});
