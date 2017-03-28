#!/usr/bin/env node

/* eslint no-console: 0 */
const colors = require('colors');
const minimist = require('minimist');
const path = require('path');
const R = require('ramda');
const debug = require('debug')('pmd');

const prettierMarkdown = require('../lib/prettier-markdown');

const argv = minimist(process.argv.slice(2));
const files = argv._;
const isMarkdown = R.compose(
  R.or(R.equals('.md'), R.equals('.markdown')),
  path.extname,
  path.resolve
);
const mdFiles = R.compose(R.map(path.resolve), R.filter(isMarkdown))(files);

const options = Object.assign({}, argv);
debug(options);
delete options._;

const prettierMarkdownCurry = R.curry(file => {
  return prettierMarkdown(file, options);
});

console.log(colors.yellow('PrettierMarkdown: start'));
console.log();
Promise.all(R.map(prettierMarkdownCurry)(mdFiles)).then(() => {
  console.log();
  console.log(colors.yellow('PrettierMarkdown: finished.'));
});
