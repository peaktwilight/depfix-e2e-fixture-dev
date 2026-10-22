const test = require("node:test");
const assert = require("node:assert");
const { User, greet } = require("./greet");
test("greets by full name", () => assert.strictEqual(greet(new User("Ada", "Lovelace")), "Hello Ada Lovelace, welcome back!"));
