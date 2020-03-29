"use strict";

const { TextEncoder } = global.TextEncoder ? global : require("text-encoding");

exports.implementation = class TextEncoderImpl {
  constructor() {
    this._internal = new TextEncoder();
  }

  get encoding() {
    return this._internal.encoding;
  }

  encode(input = "") {
    return this._internal.encode(input);
  }
};
