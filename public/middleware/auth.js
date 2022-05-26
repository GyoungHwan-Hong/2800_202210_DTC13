const { User } = require("../models/User");

const path = require('path');

let loginPath = path.join(__dirname, '../login.html');

let auth = (req, res, next) => {
  let token = req.cookies.x_auth;

  User.findByToken(token)
    .then((user) => {
      if (!user) return res.sendFile(loginPath);
      req.token = token;
      req.user = user;
      next();
    })
    .catch((err) => {
      throw res.sendFile(loginPath);
    });
};

module.exports = { auth };