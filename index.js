"use strict";

const { TextEncoder, TextDecoder } = require("./webidl2js-wrapper");
const whatwgEncoding = require("./lib/whatwg-encoding");

const sharedGlobalObject = globalThis;
TextEncoder.install(sharedGlobalObject, ["Window"]);
TextDecoder.install(sharedGlobalObject, ["Window"]);

exports.TextEncoder = sharedGlobalObject.TextEncoder;
exports.TextDecoder = sharedGlobalObject.TextDecoder;

exports.decode = whatwgEncoding.decode;
exports.getBOMEncoding = whatwgEncoding.getBOMEncoding;
exports.isSupported = whatwgEncoding.isSupported;
exports.labelToName = whatwgEncoding.labelToName;
