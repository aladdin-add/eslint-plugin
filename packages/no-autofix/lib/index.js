/**
 * @fileoverview An ESLint plugin provides autofix for some core rules.
 * @author 唯然<weiran.zsd@outlook.com>
 */
"use strict";

const all = require("./configs/all");
const rules = require("./rules");

module.exports = {
    configs: {
        all
    },
    rules
};
