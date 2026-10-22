const _ = require("lodash");
const minimist = require("minimist");
function parse(argv) { return minimist(argv.slice(2), { boolean: ["verbose"] }); }
function title(s) { return _.startCase(_.toLower(s)); }
function merged(a, b) { return _.merge({}, a, b); }
module.exports = { parse, title, merged };
if (require.main === module) console.log(parse(process.argv), title("HELLO WORLD"));
