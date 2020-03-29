// https://encoding.spec.whatwg.org/#textdecoder
[Exposed=(Window,Worker)]
interface TextDecoder {
  constructor(optional DOMString label = "utf-8", optional TextDecoderOptions options = {});
  USVString decode(optional [AllowShared] BufferSource input, optional TextDecodeOptions options = {});
};

TextDecoder includes TextDecoderCommon;

dictionary TextDecoderOptions {
  boolean fatal = false;
  boolean ignoreBOM = false;
};

dictionary TextDecodeOptions {
  boolean stream = false;
};
