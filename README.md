Prettier Markdown
=================

[![](https://img.shields.io/travis/noyobo/perttier-markdown.svg)](https://travis-ci.org/noyobo/perttier-markdown) [![Codecov](https://img.shields.io/codecov/c/github/noyobo/perttier-markdown/master.svg)](https://codecov.io/gh/noyobo/perttier-markdown/branch/master) [![npm package](https://img.shields.io/npm/v/perttier-markdown.svg)](https://www.npmjs.org/package/perttier-markdown) [![NPM downloads](http://img.shields.io/npm/dm/perttier-markdown.svg)](https://npmjs.org/package/perttier-markdown)

Prettier JavaScript code in markdown.

![before](./snapshots/before.png)![after](./snapshots/after.png)

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

`perttierMarkdown(markdownFile [,optoins] [, callback])`

```js
const perttierMarkdown = require('prettier-markdown');

perttierMarkdown('./foo.md', function(err, msg) {
  console.log(msg);
});

// promise
const promise = perttierMarkdown('./foo.md', {/* options */});
promise.then(msg => console.log)
```

## Options

TODO

