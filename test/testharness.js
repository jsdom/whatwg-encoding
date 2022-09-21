"use strict";
const assert = require("assert");

/* eslint-disable camelcase */
module.exports = {
  test(func, name) {
    test(name || "[single-file test]", func);
  },

  promise_test() {
    // No-op; the only place this is used in WPT is not applicable to our usage.
  },

  subsetTest(testFunc, ...args) {
    return testFunc(...args);
  },

  assert_true(actual) {
    assert.strictEqual(actual, true);
  },

  assert_false(actual) {
    assert.strictEqual(actual, false);
  },

  assert_equals(actual, expected) {
    assert.strictEqual(actual, expected);
  },

  assert_not_equals(actual, expected) {
    assert.notEqual(actual, expected);
  },

  assert_array_equals(actual, expected) {
    assert.deepStrictEqual([...actual], [...expected]);
  },

  assert_throws(code, func, message) {
    assert.throws(func, message);
  },

  assert_throws_js(code, func, message) {
    assert.throws(func, message);
  },

  assert_unreached() {
    assert(false);
  }
};
