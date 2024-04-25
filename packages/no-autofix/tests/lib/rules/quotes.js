/**
 * @fileoverview Tests for rule quotes.
 * @author 唯然 <weiran.zsd@outlook.com>
 */
"use strict";

const rule = require("../../../lib/rules").quotes,
    RuleTester = require("eslint").RuleTester;

const ruleTester = new RuleTester({ languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } } });

ruleTester.run("quotes", rule, {
    valid: [
        "var foo = \"bar\";",
        { code: "var foo = 'bar';", options: ["single"] },
        { code: "var foo = \"bar\";", options: ["double"] },
        { code: "var foo = 1;", options: ["single"] },
        { code: "var foo = 1;", options: ["double"] },
        { code: "var foo = \"'\";", options: ["single", { avoidEscape: true }] },
        { code: "var foo = '\"';", options: ["double", { avoidEscape: true }] },
        { code: "var foo = <>Hello world</>;", options: ["single"], },
        { code: "var foo = <>Hello world</>;", options: ["double"], },
        { code: "var foo = <>Hello world</>;", options: ["double", { avoidEscape: true }], },
        { code: "var foo = <>Hello world</>;", options: ["backtick"], },
        { code: "var foo = <div>Hello world</div>;", options: ["single"], },
        { code: "var foo = <div id=\"foo\"></div>;", options: ["single"], },
        { code: "var foo = <div>Hello world</div>;", options: ["double"], },
        { code: "var foo = <div>Hello world</div>;", options: ["double", { avoidEscape: true }], },
        { code: "var foo = `bar`;", options: ["backtick"], },
        { code: "var foo = `bar 'baz'`;", options: ["backtick"], },
        { code: "var foo = `bar \"baz\"`;", options: ["backtick"], },
        { code: "var foo = 1;", options: ["backtick"] },
        { code: "var foo = \"a string containing `backtick` quotes\";", options: ["backtick", { avoidEscape: true }] },
        { code: "var foo = <div id=\"foo\"></div>;", options: ["backtick"], },
        { code: "var foo = <div>Hello world</div>;", options: ["backtick"], },

        // Backticks are only okay if they have substitutions, contain a line break, or are tagged
        { code: "var foo = `back\ntick`;", options: ["single"], },
        { code: "var foo = `back\rtick`;", options: ["single"], },
        { code: "var foo = `back\u2028tick`;", options: ["single"], },
        { code: "var foo = `back\u2029tick`;", options: ["single"], },
        {
            code: "var foo = `back\\\\\ntick`;", // 2 backslashes followed by a newline
            options: ["single"],
        },
        { code: "var foo = `back\\\\\\\\\ntick`;", options: ["single"], },
        { code: "var foo = `\n`;", options: ["single"], },
        { code: "var foo = `back${x}tick`;", options: ["double"], },
        { code: "var foo = tag`backtick`;", options: ["double"], },

        // Backticks are also okay if allowTemplateLiterals
        { code: "var foo = `bar 'foo' baz` + 'bar';", options: ["single", { allowTemplateLiterals: true }], },
        { code: "var foo = `bar 'foo' baz` + \"bar\";", options: ["double", { allowTemplateLiterals: true }], },
        { code: "var foo = `bar 'foo' baz` + `bar`;", options: ["backtick", { allowTemplateLiterals: true }], },

        // `backtick` should not warn the directive prologues.
        { code: "\"use strict\"; var foo = `backtick`;", options: ["backtick"], },
        { code: "\"use strict\"; 'use strong'; \"use asm\"; var foo = `backtick`;", options: ["backtick"], },
        { code: "function foo() { \"use strict\"; \"use strong\"; \"use asm\"; var foo = `backtick`; }", options: ["backtick"], },
        { code: "(function() { 'use strict'; 'use strong'; 'use asm'; var foo = `backtick`; })();", options: ["backtick"], },
        { code: "(() => { \"use strict\"; \"use strong\"; \"use asm\"; var foo = `backtick`; })();", options: ["backtick"], },

        // `backtick` should not warn import/export sources.
        { code: "import \"a\"; import 'b';", options: ["backtick"], },
        { code: "import a from \"a\"; import b from 'b';", options: ["backtick"], },
        { code: "export * from \"a\"; export * from 'b';", options: ["backtick"], },

        // `backtick` should not warn property/method names (not computed).
        { code: "var obj = {\"key0\": 0, 'key1': 1};", options: ["backtick"], },
        { code: "class Foo { 'bar'(){} }", options: ["backtick"], },
        { code: "class Foo { static ''(){} }", options: ["backtick"], }
    ],
    invalid: [
        {
            code: "var foo = 'bar';",
            output: null,
            errors: [{ message: "Strings must use doublequote.", type: "Literal" }]
        },
        {
            code: "var foo = \"bar\";",
            output: null,
            options: ["single"],
            errors: [{ message: "Strings must use singlequote.", type: "Literal" }]
        },
        {
            code: "var foo = `bar`;",
            output: null,
            options: ["single"],
            errors: [{ message: "Strings must use singlequote.", type: "TemplateLiteral" }]
        },
        {
            code: "var foo = 'don\\'t';",
            output: null,
            errors: [{ message: "Strings must use doublequote.", type: "Literal" }]
        },
        {
            code: "var msg = \"Plugin '\" + name + \"' not found\"",
            output: null,
            options: ["single"],
            errors: [
                { message: "Strings must use singlequote.", type: "Literal", column: 11 },
                { message: "Strings must use singlequote.", type: "Literal", column: 31 }
            ]
        },
        {
            code: "var foo = 'bar';",
            output: null,
            options: ["double"],
            errors: [{ message: "Strings must use doublequote.", type: "Literal" }]
        },
        {
            code: "var foo = `bar`;",
            output: null,
            options: ["double"],
            errors: [{ message: "Strings must use doublequote.", type: "TemplateLiteral" }]
        },
        {
            code: "var foo = \"bar\";",
            output: null,
            options: ["single", { avoidEscape: true }],
            errors: [{ message: "Strings must use singlequote.", type: "Literal" }]
        },
        {
            code: "var foo = 'bar';",
            output: null,
            options: ["double", { avoidEscape: true }],
            errors: [{ message: "Strings must use doublequote.", type: "Literal" }]
        },
        {
            code: "var foo = '\\\\';",
            output: null,
            options: ["double", { avoidEscape: true }],
            errors: [{ message: "Strings must use doublequote.", type: "Literal" }]
        },
        {
            code: "var foo = \"bar\";",
            output: null,
            options: ["single", { allowTemplateLiterals: true }],
            errors: [{ message: "Strings must use singlequote.", type: "Literal" }]
        },
        {
            code: "var foo = 'bar';",
            output: null,
            options: ["double", { allowTemplateLiterals: true }],
            errors: [{ message: "Strings must use doublequote.", type: "Literal" }]
        },
        {
            code: "var foo = 'bar';",
            output: null,
            options: ["backtick"],
            errors: [{ message: "Strings must use backtick.", type: "Literal" }]
        },
        {
            code: "var foo = 'b${x}a$r';",
            output: null,
            options: ["backtick"],
            errors: [{ message: "Strings must use backtick.", type: "Literal" }]
        },
        {
            code: "var foo = \"bar\";",
            output: null,
            options: ["backtick"],
            errors: [{ message: "Strings must use backtick.", type: "Literal" }]
        },
        {
            code: "var foo = \"bar\";",
            output: null,
            options: ["backtick", { avoidEscape: true }],
            errors: [{ message: "Strings must use backtick.", type: "Literal" }]
        },
        {
            code: "var foo = 'bar';",
            output: null,
            options: ["backtick", { avoidEscape: true }],
            errors: [{ message: "Strings must use backtick.", type: "Literal" }]
        },

        // "use strict" is *not* a directive prologue in these statements so is subject to the rule
        {
            code: "var foo = `backtick`; \"use strict\";",
            output: null,
            options: ["backtick"],
            errors: [{ message: "Strings must use backtick.", type: "Literal" }]
        },
        {
            code: "{ \"use strict\"; var foo = `backtick`; }",
            output: null,
            options: ["backtick"],
            errors: [{ message: "Strings must use backtick.", type: "Literal" }]
        },
        {
            code: "if (1) { \"use strict\"; var foo = `backtick`; }",
            output: null,
            options: ["backtick"],
            errors: [{ message: "Strings must use backtick.", type: "Literal" }]
        },

        // `backtick` should warn computed property names.
        {
            code: "var obj = {[\"key0\"]: 0, ['key1']: 1};",
            output: null,
            options: ["backtick"],
            errors: [
                { message: "Strings must use backtick.", type: "Literal" },
                { message: "Strings must use backtick.", type: "Literal" }
            ]
        },
        {
            code: "class Foo { ['a'](){} static ['b'](){} }",
            output: null,
            options: ["backtick"],
            errors: [
                { message: "Strings must use backtick.", type: "Literal" },
                { message: "Strings must use backtick.", type: "Literal" }
            ]
        },

        // https://github.com/eslint/eslint/issues/7084
        {
            code: "<div blah={\"blah\"} />",
            output: null,
            options: ["single"],
            errors: [
                { message: "Strings must use singlequote.", type: "Literal" }
            ]
        },
        {
            code: "<div blah={'blah'} />",
            output: null,
            options: ["double"],
            errors: [
                { message: "Strings must use doublequote.", type: "Literal" }
            ]
        },
        {
            code: "<div blah={'blah'} />",
            output: null,
            options: ["backtick"],
            errors: [
                { message: "Strings must use backtick.", type: "Literal" }
            ]
        },

        // https://github.com/eslint/eslint/issues/7610
        {
            code: "`use strict`;",
            output: null,
            errors: [{ message: "Strings must use doublequote.", type: "TemplateLiteral" }]
        },
        {
            code: "function foo() { `use strict`; foo(); }",
            output: null,
            errors: [{ message: "Strings must use doublequote.", type: "TemplateLiteral" }]
        },
        {
            code: "foo = function() { `use strict`; foo(); }",
            output: null,
            errors: [{ message: "Strings must use doublequote.", type: "TemplateLiteral" }]
        },
        {
            code: "() => { `use strict`; foo(); }",
            output: null,
            errors: [{ message: "Strings must use doublequote.", type: "TemplateLiteral" }]
        },
        {
            code: "() => { foo(); `use strict`; }",
            output: null,
            errors: [{ message: "Strings must use doublequote.", type: "TemplateLiteral" }]
        },
        {
            code: "foo(); `use strict`;",
            output: null,
            errors: [{ message: "Strings must use doublequote.", type: "TemplateLiteral" }]
        },

        // https://github.com/eslint/eslint/issues/7646
        {
            code: "var foo = `foo\\nbar`;",
            output: null,
            errors: [{ message: "Strings must use doublequote.", type: "TemplateLiteral" }]
        },
        {
            code: "var foo = `foo\\\nbar`;", // 1 backslash followed by a newline
            output: null,
            errors: [{ message: "Strings must use doublequote.", type: "TemplateLiteral" }]
        },
        {
            code: "var foo = `foo\\\\\\\nbar`;", // 3 backslashes followed by a newline
            output: null,
            errors: [{ message: "Strings must use doublequote.", type: "TemplateLiteral" }]
        },
        {
            code: "````",
            output: null,
            errors: [{ message: "Strings must use doublequote.", type: "TemplateLiteral", line: 1, column: 1 }]
        }
    ]
});
