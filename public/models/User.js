const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
  ID: {
    type: String,
    unique: 1,
  },
  email: {
    type: String,
    trim: true, 
    unique: 1,
  },
  password: {
    type: String
  },
  nickname: {
    type: String
  },
  cellphone: {
    type: Number,
    default: 0,
  },
  token: {
    type: String,
  },
  tokenExp: {
    type: Number,
  },
});


userSchema.pre("save", function (next) {
  let user = this;

  console.log(user);

  if (user.isModified("password")) {
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

userSchema.methods.comparePassword = function (plainPassword) {

  return bcrypt
    .compare(plainPassword, this.password)
    .then((isMatch) => isMatch)
    .catch((err) => err);
};

userSchema.methods.generateToken = function () {
  const token = jwt.sign(this._id.toHexString(), "secretToken");
  this.token = token;
  return this.save()
    .then((user) => user)
    .catch((err) => err);
};

userSchema.statics.findByToken = function (token) {
  let user = this;
  return jwt.verify(token, "secretToken", function (err, decoded) {
    return user
      .findOne({ _id: decoded, token: token })
      .then((user) => user)
      .catch((err) => err);
  });
};

const User = mongoose.model("User", userSchema);

module.exports = { User };