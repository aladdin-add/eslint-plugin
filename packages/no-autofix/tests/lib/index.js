/**
 * @fileoverview Tests for index.js
 * @author 唯然 <weiran.zsd@outlook.com>
 */

"use strict";

const entry = require("../../lib/index");
const assert = require("assert");

describe("should have the corrent entry", () => {
    it("should export config: all", () => {
        assert(entry && entry.configs && entry.configs.all);
        assert(entry.configs.all.rules["no-autofix/no-debugger"], "error");
    });
    it("should export all rules", () => {
        const rule = entry.rules["no-debugger"];

        assert(rule && rule.meta && rule.create);
    });

    it("support 3rd-party plugins", () => {

        // console.log(entry);
    });
});
