"use strict";
/* eslint-disable no-console, no-process-exit */
const fs = require("fs");
const path = require("path");
const iconvLite = require("iconv-lite");
const fetch = require("minipass-fetch");

async function main() {
  const res = await fetch("https://encoding.spec.whatwg.org/encodings.json");
  const body = await res.json();
  const labelsToNames = {};
  const supportedNames = [];
  for (const entry of body) {
    for (const encoding of entry.encodings) {
      supportedNames.push(encoding.name);
      for (const label of encoding.labels) {
        labelsToNames[label] = encoding.name;
      }
    }
  }

  const labelsToNamesOutput = JSON.stringify(labelsToNames, undefined, 2);
  fs.writeFileSync(path.resolve(__dirname, "../lib/labels-to-names.json"), labelsToNamesOutput);

  const supportedNamesOutput = JSON.stringify(supportedNames, undefined, 2);
  fs.writeFileSync(path.resolve(__dirname, "../lib/names.json"), supportedNamesOutput);
}

main().catch(e => {
  console.error(e.stack);
  process.exit(1);
});
