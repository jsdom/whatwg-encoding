"use strict";
/* eslint-disable no-console, no-process-exit */
const fs = require("fs");
const path = require("path");
const iconvLite = require("iconv-lite");
const got = require("got");

got("https://encoding.spec.whatwg.org/encodings.json", { json: true }).then(({ body }) => {
  const labelsToNames = {};
  const supportedNames = [];
  for (const entry of body) {
    for (const encoding of entry.encodings) {
      if (iconvLite.encodingExists(encoding.name)) {
        supportedNames.push(encoding.name);
        for (const label of encoding.labels) {
          labelsToNames[label] = encoding.name;
        }
      }
    }
  }

  const labelsToNamesOutput = JSON.stringify(labelsToNames, undefined, 2);
  fs.writeFileSync(path.resolve(__dirname, "../lib/labels-to-names.json"), labelsToNamesOutput);

  const supportedNamesOutput = JSON.stringify(supportedNames, undefined, 2);
  fs.writeFileSync(path.resolve(__dirname, "../lib/supported-names.json"), supportedNamesOutput);
})
.catch(e => {
  console.error(e.stack);
  process.exit(1);
});
