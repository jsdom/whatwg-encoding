"use strict";
/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");
const lib = require("@exodus/bytes/encoding.js");

async function main() {
  const res = await fetch("https://encoding.spec.whatwg.org/encodings.json");
  const body = await res.json();
  const labelsToNames = {};
  const supportedNames = [];
  for (const entry of body) {
    for (const encoding of entry.encodings) {
      lib.normalizeEncoding(encoding.name); // asserts support
      supportedNames.push(encoding.name);
      for (const label of encoding.labels) {
        labelsToNames[label] = encoding.name;
      }
    }
  }

  const supportedNamesOutput = JSON.stringify(supportedNames, undefined, 2);
  fs.rmSync(path.resolve(__dirname, "../lib/labels-to-names.json"), { force: true });
  fs.writeFileSync(path.resolve(__dirname, "../lib/supported-names.json"), supportedNamesOutput);
}

main().catch(e => {
  console.error(e.stack);
  process.exit(1);
});
