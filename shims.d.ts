declare module 'eslint-rule-composer' {
    import * as estree from 'estree'
    import * as eslint from 'eslint'

    interface Problem {
        node: estree.Node | null
        message: string
        messageId: string | null
        data: object | null
        loc: eslint.AST.SourceLocation
        fix?: (fixer: eslint.Rule.RuleFixer) => (eslint.Rule.Fix | null)
    }

    interface Metadata {
        sourceCode: eslint.SourceCode
        settings?: object
        options: any[]
        filename: string
    }

    interface Predicate<T> {
        (problem: Problem, metadata: Metadata): T
    }

    export function mapReports(rule: eslint.Rule.RuleModule, predicate: Predicate<Problem>): eslint.Rule.RuleModule

    export function filterReports(rule: eslint.Rule.RuleModule, predicate: Predicate<boolean>): eslint.Rule.RuleModule

    export function joinReports(rules: eslint.Rule.RuleModule[]): eslint.Rule.RuleModule
}
