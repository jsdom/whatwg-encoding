"use strict";
const fs = require("fs");
const path = require("path");
const vm = require("vm");
const { TextEncoder, TextDecoder } = require("..");
const testharness = require("./testharness");
const encodingsTable = require("./web-platform-tests/resources/encodings.json");

const wptDir = path.join(__dirname, "web-platform-tests");

function createSandbox() {
  const sandbox = {
    TextEncoder,
    TextDecoder,
    // eslint-disable-next-line camelcase
    encodings_table: encodingsTable
  };
  Object.assign(sandbox, testharness);
  vm.createContext(sandbox);
  return sandbox;
}

function runWPTFile(file) {
  const code = fs.readFileSync(file, "utf8");
  vm.runInContext(code, createSandbox(), {
    filename: file,
    displayErrors: true
  });
}

describe("Web platform tests", () => {
  describe("Other tests extracted from .html files", () => {
    for (const file of fs.readdirSync(wptDir)) {
      if (path.extname(file) === ".js") {
        describe(file, () => {
          runWPTFile(path.join(wptDir, file));
        });
      }
    }
  });
});
