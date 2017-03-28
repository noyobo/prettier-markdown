'use strict';
/* eslint no-console: 0 */
const fs = require('fs');
const path = require('path');
const prettierFormat = require('./prettier-format');
const colors = require('colors');
const debug = require('debug')('pmd');
const outputFile = require('output-file');

/**
 * perttier js jsx javascript code in markdown
 * @param  {String} markdownFile  md file path
 * @return {Promise}
 */
module.exports = (markdownFile, options, callback) => {
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
  const codeRegrex = new RegExp(
    `([\\\`]{3,4})(?\:\\b(?\:${syntaxTypes})\\b\\s*\\n)([^\\1]*?)(\\1)`,
    'g'
  );
  debug('codeRegrex', codeRegrex);
  let markdownContent = '';
  try {
    markdownContent = String(fs.readFileSync(markdownFile));
  } catch (err) {
    console.log(colors.red('Failed to read file:'));
    console.log('-', path.resolve(process.cwd(), markdownFile));
    return Promise.resolve();
  }

  let prettierConent = markdownContent;
  let code;
  while ((code = codeRegrex.exec(markdownContent))) {
    const source = code[2];
    prettierConent = prettierConent.replace(
      source,
      `${prettierFormat(source)}`
    );
  }

  const outputAbsolute = path.join(options.cwd, options.output);
  const promise = new Promise(resolve => {
    let markfileReletivePath = path.relative(options.cwd, markdownFile);

    if (options.prefix) {
      let p = options.prefix;
      while (p-- > 0) {
        markfileReletivePath = markfileReletivePath.substring(
          markfileReletivePath.indexOf('/') + 1
        );
      }
    }

    const outputFilePath = path.join(outputAbsolute, markfileReletivePath);

    debug('outputFilePath', outputFilePath);
    outputFile(outputFilePath, prettierConent, { encoding: 'utf-8' }, err => {
      const filePath = path.relative(process.cwd(), markdownFile);
      if (err) {
        console.log('-', colors.red('failed: '), filePath);
      } else {
        console.log('-', colors.green('success:'), filePath);
      }
      resolve(`Prettier finished: ${filePath}`);
    });
  });

  if (typeof callback === 'function') {
    promise.then(ok => {
      callback.call(this, null, ok);
    });
  } else {
    return promise;
  }
};
