# `whatwg-encoding` is deprecated

This package provided a thin layer on top of [`iconv-lite`](https://github.com/ashtuchkin/iconv-lite) to expose some of the same primitives as the [Encoding Standard](https://encoding.spec.whatwg.org/).

It has been superseded by [`@exodus/bytes`](https://www.npmjs.com/package/@exodus/bytes), which provides the same functionality but is more spec compliant and faster. Notably, the main [`jsdom`](https://www.npmjs.com/package/jsdom) package uses `@exodus/bytes` directly.

To browse code from previous versions, see [Git history](https://github.com/jsdom/whatwg-encoding/tree/18b33289fd6ce29a1b160b30e65f1c15e3a81e6e).
