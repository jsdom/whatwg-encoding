"use strict";

const { labelToName, isSupported, decode } = require("./whatwg-encoding");

exports.implementation = class TextDecoderImpl {
  constructor(globalObject, constructorArgs = []) {
    const label = constructorArgs[0];
    const options = constructorArgs[1] || {};

    const encoding = labelToName(label);
    if (!isSupported(encoding) || encoding === "replacement") {
      throw new RangeError(`"${encoding}" is not a supported encoding name`);
    }
    this._encoding = encoding;
    this._errorMode = options._fatal ? "fatal" : "replacement";
    this._ignoreBOM = options._ignoreBOM || false;
  }

  get encoding() {
    return String(this._encoding).toLowerCase();
  }

  get fatal() {
    return this._errorMode === "fatal";
  }

  get ignoreBOM() {
    return this._ignoreBOM;
  }

  decode(input, options = {}) {
    if (options.steam === true) {
      // TODO: Implement stream support
    }
    try {
      // TODO: Implement ignoreBOM support
      return decode(Buffer.from(input), this._encoding);
    } catch (exception) {
      if (this._errorMode === "fatal") {
        throw new TypeError(exception);
      }
      return exception;
    }
  }
};
