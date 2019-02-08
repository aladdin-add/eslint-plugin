/**
 * @fileoverview An ESLint plugin provides autofix for some core rules.
 * @author 唯然<weiran.zsd@outlook.com>
 */
"use strict";

const configAll = require("./lib/configs/all");
const rules = require("./lib/rules");

module.exports = {
    configs: {
        all: configAll
    },
    rules
};
