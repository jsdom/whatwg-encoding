"use strict";

const { TextEncoder, TextDecoder } = require("./webidl2js-wrapper");

const sharedGlobalObject = {};
TextEncoder.install(sharedGlobalObject);
TextDecoder.install(sharedGlobalObject);

exports.TextEncoder = sharedGlobalObject.TextEncoder;
exports.TextDecoder = sharedGlobalObject.TextDecoder;
