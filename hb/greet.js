const Handlebars = require("handlebars");
class User {
  constructor(first, last) { this.first = first; this.last = last; }
  get fullName() { return `${this.first} ${this.last}`; }
}
const template = Handlebars.compile("Hello {{user.fullName}}, welcome back!");
// handlebars >= 4.6.0 blocks access to properties inherited from a prototype.
// Explicitly allow the "fullName" getter used by this template.
// allow the "fullName" getter used by this template.
// (duplicate comment marker to close the export object)
module.exports = {
  User,
  greet: (user) => template({ user }, { allowedProtoProperties: { fullName: true } }),
};
