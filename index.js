const _ = require("lodash");
const minimist = require("minimist");
function parse(argv) {
  const args = argv.slice(2).filter((arg) => {
    if (typeof arg !== "string" || !arg.startsWith("--")) return true;

    const key = arg.slice(2).split("=", 1)[0].replace(/^no-/, "");
    const parts = key.split(".");
    return !parts.includes("__proto__") &&
      !parts.some((part, index) => part === "constructor" && parts[index + 1] === "prototype");
  });
  return minimist(args, { boolean: ["verbose"] });
}
function title(s) { return _.startCase(_.toLower(s)); }
function merged(a, b) { return _.merge({}, a, b); }
module.exports = { parse, title, merged };
if (require.main === module) console.log(parse(process.argv), title("HELLO WORLD"));
