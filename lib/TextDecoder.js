"use strict";

const conversions = require("webidl-conversions");
const utils = require("./utils.js");

const TextDecoderOptions = require("./TextDecoderOptions.js");
const TextDecodeOptions = require("./TextDecodeOptions.js");
const implSymbol = utils.implSymbol;
const ctorRegistrySymbol = utils.ctorRegistrySymbol;

const interfaceName = "TextDecoder";

exports.is = value => {
  return utils.isObject(value) && utils.hasOwn(value, implSymbol) && value[implSymbol] instanceof Impl.implementation;
};
exports.isImpl = value => {
  return utils.isObject(value) && value instanceof Impl.implementation;
};
exports.convert = (value, { context = "The provided value" } = {}) => {
  if (exports.is(value)) {
    return utils.implForWrapper(value);
  }
  throw new TypeError(`${context} is not of type 'TextDecoder'.`);
};

function makeWrapper(globalObject) {
  if (globalObject[ctorRegistrySymbol] === undefined) {
    throw new Error("Internal error: invalid global object");
  }

  const ctor = globalObject[ctorRegistrySymbol]["TextDecoder"];
  if (ctor === undefined) {
    throw new Error("Internal error: constructor TextDecoder is not installed on the passed global object");
  }

  return Object.create(ctor.prototype);
}

exports.create = (globalObject, constructorArgs, privateData) => {
  const wrapper = makeWrapper(globalObject);
  return exports.setup(wrapper, globalObject, constructorArgs, privateData);
};

exports.createImpl = (globalObject, constructorArgs, privateData) => {
  const wrapper = exports.create(globalObject, constructorArgs, privateData);
  return utils.implForWrapper(wrapper);
};

exports._internalSetup = (wrapper, globalObject) => {};

exports.setup = (wrapper, globalObject, constructorArgs = [], privateData = {}) => {
  privateData.wrapper = wrapper;

  exports._internalSetup(wrapper, globalObject);
  Object.defineProperty(wrapper, implSymbol, {
    value: new Impl.implementation(globalObject, constructorArgs, privateData),
    configurable: true
  });

  wrapper[implSymbol][utils.wrapperSymbol] = wrapper;
  if (Impl.init) {
    Impl.init(wrapper[implSymbol]);
  }
  return wrapper;
};

exports.new = globalObject => {
  const wrapper = makeWrapper(globalObject);

  exports._internalSetup(wrapper, globalObject);
  Object.defineProperty(wrapper, implSymbol, {
    value: Object.create(Impl.implementation.prototype),
    configurable: true
  });

  wrapper[implSymbol][utils.wrapperSymbol] = wrapper;
  if (Impl.init) {
    Impl.init(wrapper[implSymbol]);
  }
  return wrapper[implSymbol];
};

const exposed = new Set(["Window", "Worker"]);

exports.install = (globalObject, globalNames = ["Window"]) => {
  if (!globalNames.some(globalName => exposed.has(globalName))) {
    return;
  }
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
