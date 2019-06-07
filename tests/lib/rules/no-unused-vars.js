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
        }
    ]
});
