const test = require("node:test");
const assert = require("node:assert");
const yaml = require("js-yaml");
test("loads yaml", () => assert.deepStrictEqual(yaml.safeLoad("a: 1"), { a: 1 }));
