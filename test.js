const assert = require("assert");
const { parse, title, merged } = require("./index");
assert.strictEqual(parse(["node","x","--verbose","a"]).verbose, true);
assert.strictEqual(title("HELLO WORLD"), "Hello World");
assert.deepStrictEqual(merged({a:1},{b:2}), {a:1,b:2});
console.log("ok");
