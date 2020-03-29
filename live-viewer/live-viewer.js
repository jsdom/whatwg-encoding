"use strict";
(() => {
  const messageInput = document.querySelector("#message");

  const components = [
    "encoded",
    "decoded"
  ];

  messageInput.addEventListener("input", update);
  update();

  function update() {
    const browserResult = getBrowserResult();
    const jsdomResult = getJsdomResult();
    const mismatchedComponents = getMismatchedComponents(browserResult, jsdomResult);

    setResult("browser", browserResult, mismatchedComponents);
    setResult("jsdom", jsdomResult, mismatchedComponents);
  }

  function setResult(kind, result, mismatchedComponents) {
    const output = document.querySelector(`#${kind}-output`);
    const error = document.querySelector(`#${kind}-error`);

    if (result instanceof Error) {
      output.hidden = true;
      error.hidden = false;
      error.textContent = result.toString();
    } else {
      output.hidden = false;
      error.hidden = true;
      for (const component of components) {
        const componentEl = output.querySelector(`#${component}`).querySelector("td");
        setComponentElValue(componentEl, result[component]);
        setComponentElMismatch(componentEl, mismatchedComponents.has(component));
      }
    }
  }

  function setComponentElValue(componentEl, value) {
    // This shows up in Edge where username/password are undefined.
    const isNonString = typeof value !== "string";
    const isEmptyString = value === "";

    componentEl.textContent = isEmptyString ? "(empty string)" : value;
    componentEl.classList.toggle("empty-string", isEmptyString);
    componentEl.classList.toggle("non-string", isNonString);
  }

  function setComponentElMismatch(componentEl, isMismatched) {
    componentEl.classList.toggle("pass", !isMismatched);
    componentEl.classList.toggle("fail", isMismatched);
  }

  function getMismatchedComponents(result1, result2) {
    const mismatched = new Set();
    for (const component of components) {
      if (typeof result1[component] === "string") {
        if (result1[component] !== result2[component]) {
          mismatched.add(component);
        }
      }
      if (result1[component] instanceof Uint8Array) {
        if (equalBuffer(result1[component], result2[component]) === false) {
          mismatched.add(component);
        }
      }
    }
    return mismatched;
  }

  function getBrowserResult() {
    try {
      const encoder = new TextEncoder();
      const decoder = new TextDecoder();
      return {
        encoded: encoder.encode(messageInput.value),
        decoded: decoder.decode(encoder.encode(messageInput.value))
      };
    } catch (e) {
      return e;
    }
  }

  function getJsdomResult() {
    try {
      const encoder = new whatwgEncoding.TextEncoder();
      const decoder = new whatwgEncoding.TextDecoder();
      return {
        encoded: encoder.encode(messageInput.value),
        decoded: decoder.decode(encoder.encode(messageInput.value))
      };
    } catch (e) {
      return e;
    }
  }

  function equalBuffer(buf1, buf2) {
    if (buf1.byteLength !== buf2.byteLength) {
      return false;
    }
    for (let i = 0; i !== buf1.byteLength; i++) {
      if (buf1[i] !== buf2[i]) {
        return false;
      }
    }
    return true;
  }

})();
