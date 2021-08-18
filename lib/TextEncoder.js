"use strict";

const conversions = require("webidl-conversions");
const utils = require("./utils.js");

const implSymbol = utils.implSymbol;
const ctorRegistrySymbol = utils.ctorRegistrySymbol;

const interfaceName = "TextEncoder";

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
  throw new TypeError(`${context} is not of type 'TextEncoder'.`);
};

function makeWrapper(globalObject) {
  if (globalObject[ctorRegistrySymbol] === undefined) {
    throw new Error("Internal error: invalid global object");
  }

  const ctor = globalObject[ctorRegistrySymbol]["TextEncoder"];
  if (ctor === undefined) {
    throw new Error("Internal error: constructor TextEncoder is not installed on the passed global object");
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
  class TextEncoder {
    constructor() {
      return exports.setup(Object.create(new.target.prototype), globalObject, undefined);
    }

    encode() {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      if (!exports.is(esValue)) {
        throw new TypeError("Illegal invocation");
      }
      const args = [];
      {
        let curArg = arguments[0];
        if (curArg !== undefined) {
          curArg = conversions["USVString"](curArg, {
            context: "Failed to execute 'encode' on 'TextEncoder': parameter 1"
          });
        } else {
          curArg = "";
        }
        args.push(curArg);
      }
      return esValue[implSymbol].encode(...args);
    }

    encodeInto(source, destination) {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      if (!exports.is(esValue)) {
        throw new TypeError("Illegal invocation");
      }

      if (arguments.length < 2) {
        throw new TypeError(
          "Failed to execute 'encodeInto' on 'TextEncoder': 2 arguments required, but only " +
            arguments.length +
            " present."
        );
      }
      const args = [];
      {
        let curArg = arguments[0];
        curArg = conversions["USVString"](curArg, {
          context: "Failed to execute 'encodeInto' on 'TextEncoder': parameter 1"
        });
        args.push(curArg);
      }
      {
        let curArg = arguments[1];
        curArg = conversions["Uint8Array"](curArg, {
          context: "Failed to execute 'encodeInto' on 'TextEncoder': parameter 2"
        });
        args.push(curArg);
      }
      return utils.tryWrapperForImpl(esValue[implSymbol].encodeInto(...args));
    }

    get encoding() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      if (!exports.is(esValue)) {
        throw new TypeError("Illegal invocation");
      }

      return esValue[implSymbol]["encoding"];
    }
  }
  Object.defineProperties(TextEncoder.prototype, {
    encode: { enumerable: true },
    encodeInto: { enumerable: true },
    encoding: { enumerable: true },
    [Symbol.toStringTag]: { value: "TextEncoder", configurable: true }
  });
  if (globalObject[ctorRegistrySymbol] === undefined) {
    globalObject[ctorRegistrySymbol] = Object.create(null);
  }
  globalObject[ctorRegistrySymbol][interfaceName] = TextEncoder;

  Object.defineProperty(globalObject, interfaceName, {
    configurable: true,
    writable: true,
    value: TextEncoder
  });
};

const Impl = require("./TextEncoder-impl.js");
