'use strict';

const colors = require('colors');
const debug = require('debug')('pmd');
const fs = require('fs');
const outputFile = require('output-file');
const path = require('path');

const prettierFormat = require('./prettier-format');

/**
 * perttier js jsx javascript code in markdown
 * @param  {String} markdownFile  md file path
 * @return {Promise}
 */
module.exports = (markdownFile, options, callback) => {
  debug('Input file:', markdownFile);
  if (typeof options === 'function') {
    options = {};
    callback = options;
  }

  // default options
  options = Object.assign(
    {
      cwd: process.cwd(),
      output: process.cwd(),
      prefix: 0,
      syntax: ['js', 'jsx', 'javascript']
    },
    options
  );

  const syntaxTypes = options.syntax.join('|');
  const formater = prettierFormat({
    tabWidth: options.tabWidth || 2
  });
  const codeRegrex = new RegExp(
    `([\\\`]{3,4})(?:\\b(?:${syntaxTypes})\\b\\s*\\n)([^\\1]*?)(\\1)`,
    'g'
  );
  debug('codeRegrex', codeRegrex);
  let markdownContent = '';
  try {
    markdownContent = String(fs.readFileSync(markdownFile));
  } catch (err) {
    console.log(colors.red('Failed to read file:'));
    console.log('-', path.resolve(options.cwd, markdownFile));
    if (typeof callback === 'function') {
      return callback(null, 'Failed to read file.');
    }
    return Promise.resolve('Failed to read file.');
  }

  let prettierConent = markdownContent;
  let code;

  while ((code = codeRegrex.exec(markdownContent))) {
    const source = code[2];
    prettierConent = prettierConent.replace(source, () => `${formater(source)}`);
  }

  let outputAbsolute;
  debug('options.output:', options.output);
  if (path.isAbsolute(options.output)) {
    outputAbsolute = options.output;
  } else {
    outputAbsolute = path.join(options.cwd, options.output);
  }

  const promise = new Promise((resolve) => {
    let markfileRelativePath = path.relative(options.cwd, markdownFile);

    if (options.prefix) {
      let p = options.prefix;
      while (p) {
        p -= 1;
        markfileRelativePath = markfileRelativePath.substring(
          markfileRelativePath.indexOf('/') + 1
        );
      }
    }

    debug('Output dir:', outputAbsolute);
    debug('After prefix', markfileRelativePath);
    const outputFilePath = path.join(outputAbsolute, markfileRelativePath);
    debug('outputFilePath', outputFilePath);
    debug('===============================');

    outputFile(outputFilePath, prettierConent, { encoding: 'utf-8' }, (err) => {
      const filePath = path.relative(options.cwd, markdownFile);
      if (err) {
        console.log('-', colors.red('failed: '), filePath);
      } else {
        console.log('-', colors.green('success:'), filePath);
      }
      resolve(`Prettier finished: ${filePath}`);
    });
  });

  if (typeof callback === 'function') {
    return promise.then((msg) => {
      callback.call(this, null, msg);
    });
  }
  return promise;
};
