"use strict";

const { labelToName, isSupported, decode } = require("./whatwg-encoding");

exports.implementation = class TextDecoderImpl {
  constructor(globalObject, [label, options = {}]) {
    const encoding = labelToName(label);
    if (encoding === null || !isSupported(encoding) || encoding === "replacement") {
      throw new RangeError(`"${label}" is not a supported encoding name`);
    }
    this._encoding = encoding;
    this._errorMode = options.fatal === true ? "fatal" : "replacement";
    this._ignoreBOM = options.ignoreBOM || false;
  }

  get encoding() {
    return this._encoding.toLowerCase();
  }

  get fatal() {
    return this._errorMode === "fatal";
  }

  get ignoreBOM() {
    return this._ignoreBOM;
  }

  decode(input, options = {}) {
    if (options.stream === true) {
      // TODO: Implement stream support
    }
    try {
      // TODO: Implement ignoreBOM support
      return decode(Buffer.from(input), this._encoding, this._ignoreBOM);
    } catch (exception) {
      if (this._errorMode === "fatal") {
        throw new TypeError(exception);
      }
      return exception;
    }
  }
};
