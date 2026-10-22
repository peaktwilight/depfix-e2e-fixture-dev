const test = require("node:test");
const assert = require("node:assert");
const { parse, title, merged } = require("./index");
test("parse reads boolean flags", () => assert.strictEqual(parse(["node", "x", "--verbose", "a"]).verbose, true));
test("title cases words", () => assert.strictEqual(title("HELLO WORLD"), "Hello World"));
test("merged combines objects", () => assert.deepStrictEqual(merged({ a: 1 }, { b: 2 }), { a: 1, b: 2 }));
