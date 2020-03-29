"use strict";

if (process.env.NO_UPDATE) {
  process.exit(0);
}

const fs = require("fs");
const path = require("path");
const util = require("util");
const stream = require("stream");

const got = require("got");

const pipeline = util.promisify(stream.pipeline);

process.on("unhandledRejection", err => {
  throw err;
});

// Pin to specific version, reflecting the spec version in the readme.
//
// To get the latest commit:
// 1. Go to https://github.com/w3c/web-platform-tests/tree/master/encoding
// 2. Press "y" on your keyboard to get a permalink
// 3. Copy the commit hash
const commitHash = "4e83bff9e071561dd10538dda073cd2f43b68e4a";

const urlPrefix = `https://raw.githubusercontent.com/web-platform-tests/wpt/${commitHash}/encoding/`;
const targetDir = path.resolve(__dirname, "..", "test", "web-platform-tests");

for (const file of [
  "api-basics.any.js",
  // "api-invalid-label.any.js",
  "api-replacement-encodings.any.js",
  "api-surrogates-utf8.any.js",
  // "encodeInto.any.js",
  // "replacement-encodings.any.js",
  "textdecoder-byte-order-marks.any.js",
  // "textdecoder-copy.any.js",
  // "textdecoder-fatal-single-byte.any.js",
  // "textdecoder-fatal-streaming.any.js",
  // "textdecoder-fatal.any.js",
  "textdecoder-ignorebom.any.js",
  // "textdecoder-labels.any.js",
  // "textdecoder-streaming.any.js",
  // "textdecoder-utf16-surrogates.any.js"
  // "textencoder-constructor-non-utf.any.js",
  // "textencoder-utf16-surrogates.any.js",
  // "unsupported-encodings.any.js"
]) {
  pipeline(
    got.stream(`${urlPrefix}${file}`),
    fs.createWriteStream(path.resolve(targetDir, file))
  );
}
