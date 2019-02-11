/* eslint no-console: 0, no-process-exit: 0*/
"use strict";

const fs = require("fs");
const path = require("path");
const gitConfig = require("git-config");

// git user.name user.email
const gitconfig = gitConfig.sync() || { user: { name: "", email: "" } };
const name = gitconfig.user.name;
const email = gitconfig.user.email;

// file paths to generated!
const ruleName = process.argv[2];
const rulePath = path.join(__dirname, `../lib/rules/${ruleName}.js`);
const testsPath = path.join(__dirname, `../tests/lib/rules/${ruleName}.js`);

// TODO: check user input
if (!ruleName) {
    console.error("please input the rule name you want to add!");
    process.exit(1);
}

const rule =
`/**
 * @fileoverview add fixer to rule ${ruleName}.
 * @author ${name}<${email}>
 */
"use strict";

const ruleComposer = require("eslint-rule-composer");
const utils = require("../utils");

const rule = utils.getFixableRule("${ruleName}");

module.exports = ruleComposer.mapReports(
    rule,
    problem => {
        problem.fix = fixer => {

            // TODO: add rule fixer here;
        };
        return problem;
    }
);
`;

const test =
`/**
 * @fileoverview Tests for rule ${ruleName}
 * @author ${name} <${email}>
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/${ruleName}");
const RuleTester = require("eslint").RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();

ruleTester.run("${ruleName}", rule, {
    valid: [

        // TODO: add valid tests here
    ],
    invalid: [

        // TODO: add invalid tests here
    ]
});
`;


fs.writeFileSync(rulePath, rule, "utf-8");
fs.writeFileSync(testsPath, test, "utf-8");
