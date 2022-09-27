class Admin {
  constructor(mail, password) {
    this.setMail(mail);
    this.setPassword(password);
  }

  setMail(mail) {
    if (mail === null || mail === undefined) {
      throw new Error();
    }
    this.mail = mail;
  }

  setPassword(password) {
    if (password === null || password === undefined) {
      throw new Error();
    }
    this.password = password;
  }
}

module.exports = Admin;
