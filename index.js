const _ = require("lodash");
const minimist = require("minimist");
function parse(argv) {
  const args = argv.slice(2).filter(arg => {
    if (typeof arg !== "string" || !arg.startsWith("--")) return true;

    // minimist 1.2.0 interprets dotted option names as nested keys and can
    // follow __proto__ into Object.prototype. Ignore options with that path.
    const key = arg.slice(2).split("=")[0].replace(/^no-/, "");
    return !key.split(".").includes("__proto__");
  });
  return minimist(args, { boolean: ["verbose"] });
}
function title(s) { return _.startCase(_.toLower(s)); }
function merged(a, b) { return _.merge({}, a, b); }
module.exports = { parse, title, merged };
if (require.main === module) console.log(parse(process.argv), title("HELLO WORLD"));
