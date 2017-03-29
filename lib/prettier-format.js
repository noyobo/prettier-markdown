'use strict';

const prettier = require('prettier');

module.exports = options =>
  source =>
    prettier.format(
      source,
      Object.assign(
        {
          // Fit code within this line limit
          printWidth: 80,
          // Number of spaces it should use per tab
          tabWidth: 2,
          // If true, will use single instead of double quotes
          singleQuote: true,
          // Controls the printing of trailing commas wherever possible. Valid options:
          // "none" - No trailing commas
          // "es5"  - Trailing commas where valid in ES5 (objects, arrays, etc)
          // "all"  - Trailing commas wherever possible (function arguments)
          //
          // NOTE: Above is only available in 0.19.0 and above. Previously this was
          // a boolean argument.
          trailingComma: 'none',
          // Controls the printing of spaces inside object literals
          bracketSpacing: true,
          // If true, puts the `>` of a multi-line jsx element at the end of
          // the last line instead of being alone on the next line
          jsxBracketSameLine: false,
          // Which parser to use. Valid options are 'flow' and 'babylon'
          parser: 'babylon'
        },
        options
      )
    );
