/**
 * @fileoverview Tests for index.js
 * @author 唯然 <weiran.zsd@outlook.com>
 */

"use strict";

const entry = require("../../lib/index");
const assert = require("assert");
let rule;

describe("should have the corrent entry", () => {
    it("should export config: all", () => {
        assert(entry && entry.configs && entry.configs.all);
        assert(entry.configs.all.rules["no-debugger"], "off");
        assert(entry.configs.all.rules["autofix/no-debugger"], "error");
    });
    it("should export all rules", () => {
        rule = entry.rules["no-debugger"];
        assert(rule && rule.meta && rule.create);

        rule = entry.rules.semi;
        assert(rule && rule.meta && rule.create);
    });
});
