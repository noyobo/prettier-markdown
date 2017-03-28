'use strict';

const fs = require('fs');
const spawn = require('child_process').spawn;
const path = require('path');
const assert = require('assert');
const rimraf = require('rimraf');

const pmd = require.resolve('../bin/cli.js');
const read = fs.readFileSync;

rimraf.sync(path.join(__dirname, './actual'));

const expectedFiles = fs.readdirSync(path.join(__dirname, './expected'));
describe('prettier markdown', function() {
  before(function(done) {
    const p = spawn(
      'node',
      [pmd].concat([
        './test/fixtures/code.md',
        '--output=./test/actual',
        '--prefix=2'
      ]),
      {
        stdio: 'inherit'
      }
    );
    p.on('close', code => {
      if (code) {
        process.exit(code);
      }
      done();
    });
  });

  function test(fixture) {
    const expectedFile = path.resolve('./test/expected/', fixture);
    const actualFile = path.resolve('./test/actual/', fixture);
    assert.deepEqual(read(actualFile), read(expectedFile));
  }

  expectedFiles.forEach(fixture => {
    it(fixture, function() {
      test(fixture);
    });
  });
});
