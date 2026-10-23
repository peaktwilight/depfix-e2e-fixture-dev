const _ = require("lodash");
const minimist = require("minimist");
function safeOption(arg) {
  const key = arg.split("=")[0];
  return !key.includes("__proto__") && !key.includes("constructor.prototype");
}
function parse(argv) { return minimist(argv.slice(2), { boolean: ["verbose"], unknown: safeOption }); }
function title(s) { return _.startCase(_.toLower(s)); }
function merged(a, b) { return _.merge({}, a, b); }
module.exports = { parse, title, merged };
if (require.main === module) console.log(parse(process.argv), title("HELLO WORLD"));
