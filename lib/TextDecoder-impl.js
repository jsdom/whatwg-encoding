"use strict";

const { TextDecoder } = global.TextDecoder ? global : require("text-encoding");

exports.implementation = class TextDecoderImpl {
  constructor(globalObject, args = []) {
    this._internal = new TextDecoder(...args);
  }

  get encoding() {
    return this._internal.encoding;
  }

  get fatal() {
    return this._internal.fatal;
  }

  get ignoreBOM() {
    return this._internal.ignoreBOM;
  }

  decode(input, options) {
    return this._internal.decode(input, options);
  }
};
