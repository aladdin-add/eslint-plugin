/**
 * @fileoverview Tests for rule no-prototype-builtins
 * @author Pig Fang <g-plane@hotmail.com>
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/no-prototype-builtins");
const RuleTester = require("eslint").RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();
const errors = 1;

ruleTester.run("no-prototype-builtins", rule, {
    valid: [
        "Object.prototype.hasOwnProperty.call(foo, \"bar\")"
    ],
    invalid: [
        {
            code: "foo.hasOwnProperty('bar')",
            output: "Object.prototype.hasOwnProperty.call(foo, 'bar')",
            errors
        },
        {
            code: "foo.bar.hasOwnProperty('baz')",
            output: "Object.prototype.hasOwnProperty.call(foo.bar, 'baz')",
            errors
        },
        {
            code: "foo.isPrototypeOf('bar')",
            output: "Object.prototype.isPrototypeOf.call(foo, 'bar')",
            errors
        },
        {
            code: "foo.propertyIsEnumerable('bar')",
            output: "Object.prototype.propertyIsEnumerable.call(foo, 'bar')",
            errors
        }
    ]
});
