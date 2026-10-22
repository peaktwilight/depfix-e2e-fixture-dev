const _ = require("lodash");
const minimist = require("minimist");
function parse(argv) {
  const args = argv.slice(2).filter(arg => {
    if (typeof arg !== "string" || !arg.startsWith("--")) return true;
    let key = arg.slice(2).split("=", 1)[0].replace(/^no-/, "");
    return !key.split(".").some(part => part === "__proto__" || part === "constructor" || part === "prototype");
  });
  return minimist(args, { boolean: ["verbose"] });
}
function title(s) { return _.startCase(_.toLower(s)); }
function merged(a, b) { return _.merge({}, a, b); }
module.exports = { parse, title, merged };
if (require.main === module) console.log(parse(process.argv), title("HELLO WORLD"));
