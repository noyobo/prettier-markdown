#!/usr/bin/env node

'use strict';

const colors = require('colors');
const debug = require('debug')('pmd');
const minimist = require('minimist');
const path = require('path');
const R = require('ramda');

const prettierMarkdown = require('../lib/prettier-markdown');

const argv = minimist(process.argv.slice(2));
const files = argv._;
const isMarkdown = R.compose(
  R.or(R.equals('.md'), R.equals('.markdown')),
  path.extname,
  path.resolve,
);
const mdFiles = R.compose(R.map(path.resolve), R.filter(isMarkdown))(files);

const options = Object.assign({}, argv);
debug(options);
delete options._;

const prettierMarkdownCurry = file => prettierMarkdown(file, options);

console.log(colors.yellow('PrettierMarkdown: start'));
console.log();
Promise.all(R.map(prettierMarkdownCurry)(mdFiles)).then(() => {
  console.log();
  console.log(colors.yellow('PrettierMarkdown: finished.'));
});
