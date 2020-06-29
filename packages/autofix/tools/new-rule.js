/* eslint no-console: 0, no-process-exit: 0*/
"use strict";

const fs = require("fs");
const path = require("path");
const util = require("util");
const gitConfig = require("git-config");
const execa = require("execa");
const argv = require("minimist")(process.argv.slice(2), { boolean: true, alias: { safe: "recommended" } });

// git user.name user.email
const gitconfig = gitConfig.sync() || { user: { name: "", email: "" } };
const name = gitconfig.user.name;
const email = gitconfig.user.email;

// file paths to generated!
const ruleName = argv._[0];
const rulePath = path.join(__dirname, `../lib/rules/${ruleName}.js`);
const testsPath = path.join(__dirname, `../tests/lib/rules/${ruleName}.js`);

try {
    require.resolve(`eslint/lib/rules/${ruleName}`);
} catch (_) {
    console.error(`Cannot find ESLint rule '\u001b[31m${ruleName}\u001b[39m'.`);
    process.exit(1);
}

if (argv.git) {
    execa.sync("git", ["checkout", "master"]);
    execa.sync("git", ["checkout", "-b", ruleName]);
}

const rule =
`/**
 * @fileoverview Add fixer to rule ${ruleName}.
 * @author ${name} <${email}>
 */
"use strict";

const ruleComposer = require("eslint-rule-composer");
const utils = require("../utils");

const rule = utils.getFixableRule("${ruleName}", ${!!argv.safe});

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
 * @fileoverview Tests for rule ${ruleName}.
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

// generate rule def & tests & docs
const writeFile = util.promisify(fs.writeFile);

Promise.all([
    writeFile(rulePath, rule, "utf-8"),
    writeFile(testsPath, test, "utf-8")
]).then(() => {
    require("./generate-readme-table");
    console.log(`file created:\n${rulePath}\n${testsPath}`);
});
