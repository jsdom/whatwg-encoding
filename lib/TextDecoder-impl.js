"use strict";

const { labelToName, isSupported } = require("./whatwg-encoding");
const iconvLite = require("iconv-lite");

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
    let bytes;
    if (input === undefined) {
      bytes = new Uint8Array(0);
    } else if (input.buffer === undefined) {
      bytes = Buffer.from(input);
    } else {
      bytes = input;
    }

    let output = "";

    if (options.stream === true) {
      if (this._decoder === undefined) {
        this._decoder = iconvLite.decodeStream(this._encoding);
      }
      this._decoder.write(input);
      let chunk;
      while ((chunk = this._decoder.read()) !== null) {
        output += chunk;
      }
    } else {
      output = iconvLite.decode(bytes, this._encoding, {
        stripBOM: !this.ignoreBOM
      });
    }

    return output;
  }
};
