"use strict";
const supportedNames = require("./supported-names.json");
const lib = require("@exodus/bytes/encoding.js");

const supportedNamesSet = new Set(supportedNames);
const toCased = new Map(supportedNames.map(name => [name.toLowerCase(), name]));

// https://encoding.spec.whatwg.org/#concept-encoding-get
exports.labelToName = label => {
  const encoding = lib.normalizeEncoding(label);
  return (encoding && toCased.get(encoding)) || null;
};

// https://encoding.spec.whatwg.org/#decode
exports.decode = (uint8Array, fallbackEncodingName) => {
  const encoding = fallbackEncodingName;
  if (!exports.isSupported(encoding)) {
    throw new RangeError(`"${encoding}" is not a supported encoding name`);
  }

  return lib.legacyHookDecode(uint8Array, encoding.toLowerCase());
};

// https://github.com/whatwg/html/issues/1910#issuecomment-254017369
exports.getBOMEncoding = uint8Array => {
  const encoding = lib.getBOMEncoding(uint8Array);
  return encoding ? encoding.toUpperCase() : null;
};

exports.isSupported = name => {
  return supportedNamesSet.has(String(name));
};
