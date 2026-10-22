const test = require("node:test");
const assert = require("node:assert");
const minimist = require("minimist");
test("flags parse", () => assert.deepStrictEqual(minimist(["--a", "1"]).a, 1));
