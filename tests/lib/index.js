/**
 * @fileoverview Tests for index.js
 * @author 唯然 <weiran.zsd@outlook.com>
 */

"use strict";

const entry = require("../../lib/index");
const assert = require("assert");

describe("should have the corrent entry", () => {
    it("should export config: all", () => {
        assert(typeof entry === "object");
        assert(typeof entry.configs === "object");
        assert(typeof entry.configs.all === "object");
        assert(entry.configs.all["no-debugger"], "off");
        assert(entry.configs.all["autofix/no-debugger"], "error");
    });
    it("should export all rules", () => {
        const rule = entry.rules["no-debugger"];

        assert(rule);
        assert(rule.meta);
        assert(rule.create);
    });
});
