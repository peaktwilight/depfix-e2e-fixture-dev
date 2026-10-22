const marked = require("marked");

const MAX_BRACKET_DEPTH = 32;

function hasExcessiveBracketNesting(text) {
  let depth = 0;
  let escaped = false;
  for (const character of text) {
    if (escaped) {
      escaped = false;
      continue;
    }
    if (character === "\\") {
      escaped = true;
    } else if (character === "[") {
      if (++depth > MAX_BRACKET_DEPTH) return true;
    } else if (character === "]" && depth > 0) {
      depth--;
    }
  }
  return false;
}

// Render user supplied markdown with raw html escaped.
module.exports = function render(text) {
  if (typeof text === "string" && hasExcessiveBracketNesting(text)) {
    return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
  return marked(text, { sanitize: true });
};
