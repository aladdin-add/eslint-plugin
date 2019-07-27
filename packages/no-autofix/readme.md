<p align="center">
  <a href="https://ci.appveyor.com/api/projects/status/v562l6v4h098dvtf?svg=true">
    <img src="https://ci.appveyor.com/api/projects/status/v562l6v4h098dvtf?svg=true"
         alt="build status">
  </a>
  <a href="https://david-dm.org/tplss/node">
    <img src="https://david-dm.org/aladdin-add/eslint-plugin-autofix/status.svg"
         alt="dependency status">
  </a>
</p>

# eslint-plugin-no-autofix

## Why

[Some warnings is auto-fixable but we do not want to fix it, like "prefer-const" .](https://github.com/Microsoft/vscode-eslint/issues/208)

## Install & usage

```bash
npm i eslint-plugin-no-autofix -D
```

add prefix "no-autofix/" to the rulename in eslintrc:

```js
{
  "plugins": ["no-autofix"],
  "rules": {
    "prefer-const": "off",
    "no-autofix/prefer-const": "error"
  }
}
```

## Supported rules

It supports [all eslint core rules](https://eslint.org/docs/rules/).

## Acknowledgement

+ [ESLint](https://eslint.org)
+ [eslint-rule-composer](https://github.com/not-an-aardvark/eslint-rule-composer)
