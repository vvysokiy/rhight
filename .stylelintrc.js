module.exports = {
  "plugins": [
    "stylelint-csstree-validator"
  ],
  "extends": [
    "stylelint-config-standard",
    "stylelint-config-css-modules"
  ],
  "ignoreFiles": [
    "**/dist",
    "**/*.tsx"
  ],
  "rules": {
    "csstree/validator": {
      "ignore": ["composes", "var"]
    },
    // "function-url-quotes": "always",
    // "string-quotes": "double",
    // "no-empty-source": null,
    "at-rule-no-unknown": null,
    // 'no-descending-specificity': null,
    // "selector-list-comma-newline-after": null,
    // "selector-pseudo-class-no-unknown": [
    //   true,
    //   {
    //     "ignorePseudoClasses": [
    //       "global",
    //       "local"
    //     ]
    //   }
    // ]
  }
}
