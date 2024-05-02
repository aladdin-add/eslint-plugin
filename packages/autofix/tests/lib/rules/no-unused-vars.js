/**
 * @fileoverview Tests for rule no-unused-vars.
 * @author Pig Fang <g-plane@hotmail.com>
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/no-unused-vars");
const RuleTester = require("../../rule-tester.js").RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();

ruleTester.run("no-unused-vars", rule, {
    valid: [
        "import 'm'",

        // https://github.com/aladdin-add/eslint-plugin/issues/58
        `const { _ } = require('lib/locale.js');
            class OneDriveApi {
                async example() {
                    throw new Error(_('oops'));
                }
            }
            module.exports = { OneDriveApi };`
    ],
    invalid: [
        {
            code: "import * as m from 'm'",
            output: "",
            errors: 1
        },
        {
            code: "import m from 'm'",
            output: "",
            errors: 1
        },
        {
            code: "import {m} from 'm'",
            output: "",
            errors: 1
        },
        {
            code: "import {m1 as m2} from 'm'",
            output: "",
            errors: 1
        },
        {
            code: "import m, {b} from 'm'; b;",
            output: "import  {b} from 'm'; b;",
            errors: 1
        },
        {
            code: "import {a, b} from 'm'; b;",
            output: "import { b} from 'm'; b;",
            errors: 1
        },
        {
            code: "import {a1 as a2, b} from 'm'; b;",
            output: "import { b} from 'm'; b;",
            errors: 1
        },
        {
            code: "import {a, b} from 'm'; a;",
            output: "import {a} from 'm'; a;",
            errors: 1
        },
        {
            code: "import m, {a} from 'm'; m;",
            output: "import m from 'm'; m;",
            errors: 1
        },
        {
            code: "var a",
            output: "",
            errors: 1
        },
        {
            code: "var a = b",
            output: "",
            errors: 1
        },
        {
            code: "var a = undefined",
            output: "",
            errors: 1
        },
        {
            code: "var a = null",
            output: "",
            errors: 1
        },
        {
            code: "var a = 'b'",
            output: "",
            errors: 1
        },
        {
            code: "var a = this",
            output: "",
            errors: 1
        },
        {
            code: "var a = `template`",
            output: "",
            errors: 1
        },
        {
            code: "var a = this.value",
            output: "",
            errors: 1
        },
        {
            code: "var a = b = c",
            output: null,
            errors: 1
        },
        {
            code: "var a = b = c()",
            output: null,
            errors: 1
        },
        {
            code: "var a = `template-${value}`",
            output: null,
            errors: 1
        },
        {
            code: "var a = b()",
            output: null,
            errors: 1
        },
        {
            code: "var a = (b()).c",
            output: null,
            errors: 1
        },
        {
            code: "var [a] = c",
            output: "var [] = c",
            errors: 1
        },
        {
            code: "var [a, b] = c",
            output: "var [, ] = c",
            errors: 2
        },
        {
            code: "var [a, b] = c; a;",
            output: "var [a, ] = c; a;",
            errors: 1
        },
        {
            code: "var [a, b] = c; b;",
            output: "var [, b] = c; b;",
            errors: 1
        },
        {
            code: "var a = b, c = d; c;",
            output: "var  c = d; c;",
            errors: 1
        },
        {
            code: "var a = b, c = d; a;",
            output: "var a = b ; a;",
            errors: 1
        },
        {
            code: "let {...a} = b",
            output: "let {} = b",
            errors: 1
        },
        {
            code: "function foo(...args){}",
            output: null,
            errors: 2
        },
        {
            code: "function foo(a, b, c){console.log(b);}; foo(1, 2, 3);",
            output: "function foo(a, b ){console.log(b);}; foo(1, 2, 3);",
            errors: 1,
            options: [{
                args: "after-used",
                argsIgnorePattern: "^_"
            }]
        },
        {
            code: "const foo = function(a, b, c) {console.log(b);}; foo(1, 2, 3);",
            output: "const foo = function(a, b ) {console.log(b);}; foo(1, 2, 3);",
            errors: 1,
            options: [{
                args: "after-used",
                argsIgnorePattern: "^_"
            }]
        },
        {
            code: "const foo = (a, b, c) => {console.log(b);}; foo(1, 2, 3);",
            output: "const foo = (a, b ) => {console.log(b);}; foo(1, 2, 3);",
            errors: 1,
            options: [{
                args: "after-used",
                argsIgnorePattern: "^_"
            }]
        },
        {
            code: "const foo = (a) => {}; foo();",
            output: "const foo = () => {}; foo();",
            errors: 1,
            options: [{
                args: "after-used",
                argsIgnorePattern: "^_"
            }]
        },
        {
            code: "const foo = a => {}; foo();",
            output: "const foo = () => {}; foo();",
            errors: 1,
            options: [{
                args: "after-used",
                argsIgnorePattern: "^_"
            }]
        },
        {
            code: "function foo(a, b, c){console.log(b);}; foo(1, 2, 3);",
            output: "function foo(_a, b, _c){console.log(b);}; foo(1, 2, 3);",
            errors: 2,
            options: [{
                args: "all",
                argsIgnorePattern: "^_"
            }]
        },
        {
            code: "function foo(a, b, c){console.log(b);}; foo(1, 2, 3);",
            output: null,
            errors: 2,
            options: [{
                args: "all",
                argsIgnorePattern: "_$"
            }]
        },
        {
            code: "function foo(a, b, c){console.log(b);}; foo(1, 2, 3);",
            output: null,
            errors: 2,
            options: [{
                args: "all"
            }]
        },
        {
            code: "let {a} = b",
            output: "let {} = b",
            errors: 1
        },
        {
            code: "let {a,} = b",
            output: "let {} = b",
            errors: 1
        },
        {
            code: "let {a1: a2} = b",
            output: "let {} = b",
            errors: 1
        },
        {
            code: "let {a = b} = c",
            output: "let {} = c",
            errors: 1
        },
        {
            code: "let {a = b()} = c",
            output: null,
            errors: 1
        },
        {
            code: "let {a, b} = c; b;",
            output: "let { b} = c; b;",
            errors: 1
        },
        {
            code: "let {a, b} = c; a;",
            output: "let {a } = c; a;",
            errors: 1
        }
    ]
});
