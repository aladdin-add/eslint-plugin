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

# eslint-plugin-autofix

## Install & usage

```bash
$ npm i eslint-plugin-autofix -D
```

add prefix "autofix" to the rulename in eslintrc:
```js
{
  "plugins": ["autofix"],
  "rules": {
    "autofix/no-debugger": "error"
  }
}
```

## Supported rules

+ 🛠[no-debugger](https://eslint.org/docs/rules/no-debugger)
+ 🛠[no-console](https://eslint.org/docs/rules/no-console)
+ 🛠[prefer-spread](https://eslint.org/docs/rules/prefer-spread)

## Acknowledgement
+ [ESLint](https://eslint.org)
+ [eslint-rule-composer](https://github.com/not-an-aardvark/eslint-rule-composer)