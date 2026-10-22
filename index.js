const _ = require("lodash");
const minimist = require("minimist");
function parse(argv) {
  const args = argv.slice(2);
  const safeArgs = [];
  const unsafePathParts = new Set(["__proto__", "constructor", "prototype"]);

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg.startsWith("--")) {
      const option = arg.slice(2).split("=", 1)[0].replace(/^no-/, "");
      if (option.split(".").some((part) => unsafePathParts.has(part))) {
        // Discard a separate option value along with the unsafe option.
        if (!arg.includes("=") && args[i + 1] && !args[i + 1].startsWith("-")) i++;
        continue;
      }
    }
    safeArgs.push(arg);
  }

  return minimist(safeArgs, { boolean: ["verbose"] });
}
function title(s) { return _.startCase(_.toLower(s)); }
function merged(a, b) { return _.merge({}, a, b); }
module.exports = { parse, title, merged };
if (require.main === module) console.log(parse(process.argv), title("HELLO WORLD"));
