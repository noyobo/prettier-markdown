Prettier Markdown
=================

[![](https://travis-ci.org/noyobo/prettier-markdown.svg?branch=master)](https://travis-ci.org/noyobo/prettier-markdown) [![Codecov](https://img.shields.io/codecov/c/github/noyobo/prettier-markdown/master.svg)](https://codecov.io/gh/noyobo/prettier-markdown/branch/master) [![npm package](https://img.shields.io/npm/v/prettier-markdown.svg)](https://www.npmjs.org/package/prettier-markdown) [![NPM downloads](http://img.shields.io/npm/dm/prettier-markdown.svg)](https://npmjs.org/package/prettier-markdown)

[Prettier](https://github.com/prettier/prettier) JavaScript code in markdown.

#### before / after

![compare](./snapshots/compare.png)

## Usage 

```
yarn global add prettier-markdown
```

```
npm install [-g] prettier-markdown
```

##  CLI

Run prettier-markdown through the CLI with this script.

```bash
prettier-markdown ./**/*.md

# Short command
pmd ./**/*.md
```

## API

If has `callback` argument, otherwise return a Promise object.

`prettierMarkdown(markdownFile [,options] [, callback])`

```js
const prettierMarkdown = require('prettier-markdown');

prettierMarkdown('./foo.md', function(err, msg) {
  console.log(msg);
});

// promise
const promise = prettierMarkdown(
  './foo.md',
  {
    /* options */
  }
);
promise.then(msg => console.log);
```

## Options

TODO

