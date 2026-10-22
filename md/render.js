let marked;
try {
  marked = require("marked");
} catch (error) {
  // The nested package may be used without its dependencies installed. Keep a
  // small escaped fallback for that case; normal installations use marked.
  if (error.code !== "MODULE_NOT_FOUND" || !/Cannot find module ['\"]marked['\"]/.test(error.message)) throw error;
  marked = null;
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[character]));
}

function fallbackRender(text) {
  const source = String(text);
  const linkPattern = /\[([^\]]+)\]\(([^)\s]+)\)/g;
  const normalized = (href) => href
    .replace(/&(?:#0*58;?|#x0*3a;?|colon;)/gi, ":")
    .replace(/[\u0000-\u0020\u007f]/g, "");
  let output = "";
  let cursor = 0;
  let match;
  while ((match = linkPattern.exec(source))) {
    output += escapeHtml(source.slice(cursor, match.index));
    const label = escapeHtml(match[1]);
    const href = match[2];
    if (/^(?:data|javascript|vbscript):/i.test(normalized(href))) {
      output += label;
    } else {
      output += `<a href="${escapeHtml(href)}">${label}</a>`;
    }
    cursor = linkPattern.lastIndex;
  }
  output += escapeHtml(source.slice(cursor));
  output = output.replace(/\*([^*\n]+)\*/g, "<em>$1</em>");
  return `<p>${output}</p>\n`;
}

const renderer = marked && new marked.Renderer();
if (renderer) {
  const renderLink = renderer.link;
  renderer.link = function (href, title, text) {
    // marked 0.3.5's sanitize option permits data: URI links. Normalize
    // whitespace and HTML character references before checking the scheme.
    const normalizedHref = String(href)
      .replace(/&(?:#0*58;?|#x0*3a;?|colon;)/gi, ":")
      .replace(/[\u0000-\u0020\u007f]/g, "");
    if (/^data:/i.test(normalizedHref)) return text;
    return renderLink.call(this, href, title, text);
  };
}

// Render user supplied markdown with raw html escaped.
module.exports = function render(text) {
  return marked
    ? marked(text, { sanitize: true, renderer })
    : fallbackRender(text);
};
