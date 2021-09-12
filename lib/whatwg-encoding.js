"use strict";
const names = require("./names.json");
const labelsToNames = require("./labels-to-names.json");

const namesSet = new Set(names);

// https://encoding.spec.whatwg.org/#concept-encoding-get
exports.labelToName = label => {
  label = String(label).trim().toLowerCase();

  return labelsToNames[label] || null;
};

// https://encoding.spec.whatwg.org/#decode
exports.decode = (uint8Array, fallbackEncodingName, { errorMode = "replacement" } = {}) => {
  let encoding = fallbackEncodingName;
  if (!exports.isSupported(encoding)) {
    throw new RangeError(`"${encoding}" is not a supported encoding name`);
  }

  if (encoding === "replacement") {
    // the TextDecoder constructor will early-error. We implement
    // https://encoding.spec.whatwg.org/#replacement-decoder instead.
    if (uint8Array.byteLength === 0) {
      return "";
    }

    if (errorMode === "fatal") {
      throw new TypeError("The replacement encoding always errors on any non-empty input");
    } else {
      return "\uFFFD".repeat(uint8Array.byteLength);
    }
  }

  const bomEncoding = exports.getBOMEncoding(uint8Array);
  let start = 0;
  if (bomEncoding !== null) {
    encoding = bomEncoding;
    start = bomEncoding === "UTF-8" ? 3 : 2;
  }

  const subarray = uint8Array.subarray(start, uint8Array.byteLength);

  return (new TextDecoder(encoding, { ignoreBOM: true, fatal: errorMode === "fatal" })).decode(subarray);
};

// https://github.com/whatwg/html/issues/1910#issuecomment-254017369
exports.getBOMEncoding = uint8Array => {
  if (uint8Array[0] === 0xFE && uint8Array[1] === 0xFF) {
    return "UTF-16BE";
  } else if (uint8Array[0] === 0xFF && uint8Array[1] === 0xFE) {
    return "UTF-16LE";
  } else if (uint8Array[0] === 0xEF && uint8Array[1] === 0xBB && uint8Array[2] === 0xBF) {
    return "UTF-8";
  }

  return null;
};

exports.isSupported = name => {
  return namesSet.has(String(name));
};
