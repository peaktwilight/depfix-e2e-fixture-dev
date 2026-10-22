const test = require("node:test");
const assert = require("node:assert");
const render = require("./render");
test("renders emphasis", () => assert.match(render("*hi*"), /<em>hi<\/em>/));
test("escapes raw html", () => {
  const out = render("<script>alert(1)</script>");
  assert.ok(!out.includes("<script>"), out);
});
