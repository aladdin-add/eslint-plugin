/**
 * @fileoverview Common utils for AST. (copied from eslint repo)
 * @author Gyandeep Singh
 */

"use strict";

const anyFunctionPattern = /^(?:Function(?:Declaration|Expression)|ArrowFunctionExpression)$/u;
const sideEffectFree = new Set(["Literal", "Identifier", "ThisExpression"]);

// A set of node types that can contain a list of statements
const STATEMENT_LIST_PARENTS = new Set(["Program", "BlockStatement", "SwitchCase"]);

/**
 * Finds a function node from ancestors of a node.
 * @param {ASTNode} node A start node to find.
 * @returns {Node|null} A found function node.
 */
function getUpperFunction(node) {
    for (let currentNode = node; currentNode; currentNode = currentNode.parent) {
        if (anyFunctionPattern.test(currentNode.type)) {
            return currentNode;
        }
    }
    return null;
}

/**
 * Check if an expression has side effect.
 * @param {Node} node AST node
 * @returns {boolean} result
 */
function hasSideEffect(node) {
    if (sideEffectFree.has(node.type)) {
        return false;
    }

    if (node.type === "MemberExpression") {
        return hasSideEffect(node.object) || hasSideEffect(node.property);
    }

    if (node.type === "TemplateLiteral") {
        return node.expressions.length !== 0;
    }

    return true;
}

module.exports = {
    getUpperFunction,
    hasSideEffect,
    STATEMENT_LIST_PARENTS
};
