const prettierMatkdown = require('../lib/prettier-markdown');
const path = require('path');
const fs = require('fs');
const assert = require('assert');
const rimraf = require('rimraf');

const read = fs.readFileSync;

function testFile(file) {
  const actual = path.join(__dirname, './actual/', file);
  const expected = path.join(__dirname, './expected/', file);
  assert.deepEqual(read(actual), read(expected));
}

describe('prettier-markdown', () => {
  describe('callback', () => {
    beforeEach((done) => {
      rimraf(path.join(__dirname, './actual'), () => {
        done();
      });
    });
    it('callback should be work', (done) => {
      prettierMatkdown(
        path.join(__dirname, './fixtures/callback.md'), {
          cwd: __dirname,
          prefix: 2,
          output: './actual/',
        },
        (err) => {
          assert.ok(err === null, 'prettier-markdown throw error');
          testFile('callback.md');
          done();
        },
      );
    });

    it('output absolute path', (done) => {
      prettierMatkdown(
        path.join(__dirname, './fixtures/callback.md'), {
          cwd: __dirname,
          prefix: 2,
          output: path.join(__dirname, './actual/'),
        },
        (err) => {
          assert.ok(err === null, 'prettier-markdown throw error');
          testFile('callback.md');
          done();
        },
      );
    });

    it('skip file not exists', (done) => {
      prettierMatkdown(
        path.join(__dirname, './fixtures/xx.md'), {
          cwd: __dirname,
          prefix: 2,
          output: path.join(__dirname, './actual/'),
        },
        (err, msg) => {
          assert.ok(err === null, 'prettier-markdown throw error');
          assert.equal(msg, 'Failed to read file.');
          done();
        },
      );
    });
  });

  describe('promise', () => {
    beforeEach((done) => {
      rimraf(path.join(__dirname, './actual'), () => {
        done();
      });
    });


    it('skip file not exists', (done) => {
      const promise = prettierMatkdown(
        path.join(__dirname, './fixtures/xx.md'), {
          cwd: __dirname,
          prefix: 2,
          output: path.join(__dirname, './actual/'),
        },
      );

      promise.then((msg) => {
        assert.equal(msg, 'Failed to read file.');
        done();
      });
    });
  });
});
