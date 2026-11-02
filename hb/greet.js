const Handlebars = require("handlebars");
class User {
  constructor(first, last) { this.first = first; this.last = last; }
  get fullName() { return `${this.first} ${this.last}`; }
}
const template = Handlebars.compile("Hello {{user.fullName}}, welcome back!");
module.exports = { User, greet: (user) => template({ user: { fullName: user.fullName } }) };
