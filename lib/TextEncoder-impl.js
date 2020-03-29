"use strict";

const { encode } = require("./whatwg-encoding");

exports.implementation = class TextEncoderImpl {
  constructor() {
    this._encoding = "utf-8";
  }

  get encoding() {
    return this._encoding;
  }

  encode(input = "") {
    return encode(Buffer.from(input));
  }

  encodeInto(/* source, destination */) {
    // TODO Implement stream copy support
  }
};
