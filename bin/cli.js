#!/usr/bin/env node

'use strict';

/* eslint no-console: 0 */
const colors = require('colors');
const DEBUG = require('debug');

const debug = DEBUG('pmd');
const minimist = require('minimist');
const pkg = require('../package.json');

const argv = minimist(process.argv.slice(2), {
  boolean: ['version', 'verbose', 'help', 'debug'],
  alias: {
    version: 'v',
    verbose: 'V',
    help: 'h'
  }
});

if (argv.verbose) {
  DEBUG.enable('pmd');
}

const path = require('path');
const R = require('ramda');
const prettierMarkdown = require('../lib/prettier-markdown');

if (argv.version) {
  console.log('version:', pkg.version);
  process.exit(0);
}

if (argv.help) {
  console.log('');
  console.log('Usage:');
  console.log('  prettier-markdown <files> [options]');
  console.log('  pmd <files>');
  console.log();
  console.log('Options:');
  console.log('  --version, -v          Print prettier-markdonw version.');
  console.log('  --verbose, -V          Print verbose prettier information.');
  console.log();
  process.exit(0);
}

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

const prettierMarkdownCurry = file => prettierMarkdown(file, options);

console.log(colors.yellow('PrettierMarkdown: start'));
console.log();
Promise.all(R.map(prettierMarkdownCurry)(mdFiles)).then(() => {
  console.log();
  console.log(colors.yellow('PrettierMarkdown: finished.'));
});
