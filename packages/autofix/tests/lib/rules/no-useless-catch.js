/**
 * @fileoverview Tests for rule no-useless-catch.
 * @author Pig Fang <g-plane@hotmail.com>
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/no-useless-catch");
const RuleTester = require("eslint").RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();

ruleTester.run("no-useless-catch", rule, {
    valid: [
        "try {} catch (e) {}"
    ],
    invalid: [
        {
            code: "try {} catch (e) { throw e }",
            output: "{}",
            errors: 1
        },
        {
            code: "try { fn() } catch (e) { throw e }",
            output: "{ fn() }",
            errors: 1
        },
        {
            code: "let a; try { let a } catch (e) { throw e };",
            output: "let a; { let a };",
            errors: 1
        },
        {
            code: "try {} catch (e) { throw e } finally {}",
            output: "try {}  finally {}",
            errors: 1
        }
    ]
});
