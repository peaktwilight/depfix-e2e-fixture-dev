const marked = require("marked");
// Render user supplied markdown with raw html escaped.
module.exports = function render(text) {
  return marked(text, { sanitize: true });
};
