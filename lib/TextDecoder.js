"use strict";

const conversions = require("webidl-conversions");
const utils = require("./utils.js");

const TextDecoderOptions = require("./TextDecoderOptions.js");
const TextDecodeOptions = require("./TextDecodeOptions.js");
const implSymbol = utils.implSymbol;
const ctorRegistrySymbol = utils.ctorRegistrySymbol;

const interfaceName = "TextDecoder";

exports.is = function is(obj) {
  return utils.isObject(obj) && utils.hasOwn(obj, implSymbol) && obj[implSymbol] instanceof Impl.implementation;
};
exports.isImpl = function isImpl(obj) {
  return utils.isObject(obj) && obj instanceof Impl.implementation;
};
exports.convert = function convert(obj, { context = "The provided value" } = {}) {
  if (exports.is(obj)) {
    return utils.implForWrapper(obj);
  }
  throw new TypeError(`${context} is not of type 'TextDecoder'.`);
};

exports.create = function create(globalObject, constructorArgs, privateData) {
  if (globalObject[ctorRegistrySymbol] === undefined) {
    throw new Error("Internal error: invalid global object");
  }

  const ctor = globalObject[ctorRegistrySymbol]["TextDecoder"];
  if (ctor === undefined) {
    throw new Error("Internal error: constructor TextDecoder is not installed on the passed global object");
  }

  let obj = Object.create(ctor.prototype);
  obj = exports.setup(obj, globalObject, constructorArgs, privateData);
  return obj;
};
exports.createImpl = function createImpl(globalObject, constructorArgs, privateData) {
  const obj = exports.create(globalObject, constructorArgs, privateData);
  return utils.implForWrapper(obj);
};
exports._internalSetup = function _internalSetup(obj, globalObject) {};
exports.setup = function setup(obj, globalObject, constructorArgs = [], privateData = {}) {
  privateData.wrapper = obj;

  exports._internalSetup(obj, globalObject);
  Object.defineProperty(obj, implSymbol, {
    value: new Impl.implementation(globalObject, constructorArgs, privateData),
    configurable: true
  });

  obj[implSymbol][utils.wrapperSymbol] = obj;
  if (Impl.init) {
    Impl.init(obj[implSymbol], privateData);
  }
  return obj;
};

exports.install = function install(globalObject) {
  class TextDecoder {
    constructor() {
      const args = [];
      {
        let curArg = arguments[0];
        if (curArg !== undefined) {
          curArg = conversions["DOMString"](curArg, { context: "Failed to construct 'TextDecoder': parameter 1" });
        } else {
          curArg = "utf-8";
        }
        args.push(curArg);
      }
      {
        let curArg = arguments[1];
        curArg = TextDecoderOptions.convert(curArg, { context: "Failed to construct 'TextDecoder': parameter 2" });
        args.push(curArg);
      }
      return exports.setup(Object.create(new.target.prototype), globalObject, args);
    }

    decode() {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      if (!exports.is(esValue)) {
        throw new TypeError("Illegal invocation");
      }
      const args = [];
      {
        let curArg = arguments[0];
        if (curArg !== undefined) {
          if (utils.isArrayBuffer(curArg)) {
          } else if (ArrayBuffer.isView(curArg)) {
          } else {
            throw new TypeError(
              "Failed to execute 'decode' on 'TextDecoder': parameter 1" + " is not of any supported type."
            );
          }
        }
        args.push(curArg);
      }
      {
        let curArg = arguments[1];
        curArg = TextDecodeOptions.convert(curArg, {
          context: "Failed to execute 'decode' on 'TextDecoder': parameter 2"
        });
        args.push(curArg);
      }
      return esValue[implSymbol].decode(...args);
    }

    get encoding() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      if (!exports.is(esValue)) {
        throw new TypeError("Illegal invocation");
      }

      return esValue[implSymbol]["encoding"];
    }

    get fatal() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      if (!exports.is(esValue)) {
        throw new TypeError("Illegal invocation");
      }

      return esValue[implSymbol]["fatal"];
    }

    get ignoreBOM() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      if (!exports.is(esValue)) {
        throw new TypeError("Illegal invocation");
      }

      return esValue[implSymbol]["ignoreBOM"];
    }
  }
  Object.defineProperties(TextDecoder.prototype, {
    decode: { enumerable: true },
    encoding: { enumerable: true },
    fatal: { enumerable: true },
    ignoreBOM: { enumerable: true },
    [Symbol.toStringTag]: { value: "TextDecoder", configurable: true }
  });
  if (globalObject[ctorRegistrySymbol] === undefined) {
    globalObject[ctorRegistrySymbol] = Object.create(null);
  }
  globalObject[ctorRegistrySymbol][interfaceName] = TextDecoder;

  Object.defineProperty(globalObject, interfaceName, {
    configurable: true,
    writable: true,
    value: TextDecoder
  });
};

const Impl = require("./TextDecoder-impl.js");
