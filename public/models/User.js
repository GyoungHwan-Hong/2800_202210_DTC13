const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    trim: true, //dhsdb 1541 @naver.com 을 dhsdb1541@naver.com로 trim
    unique: 1,
  },
  password: {
    type: String,
    minLength: 5,
  },
  lastName: {
    type: String,
    maxLength: 50,
  },
  role: {
    type: Number,
    default: 0,
  },
  image: String,
  token: {
    type: String,
  },
  tokenExp: {
    type: Number,
  },
});

//save 메소드가 실행되기전에 비밀번호를 암호화하는 로직을 짜야한다
userSchema.pre("save", function (next) {
  let user = this;

  //model 안의 paswsword가 변환될때만 암호화
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
  //plainPassword를 암호화해서 현재 비밀번호화 비교
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
  //secretToken을 통해 user의 id값을 받아오고 해당 아이디를 통해
  //Db에 접근해서 유저의 정보를 가져온다
  return jwt.verify(token, "secretToken", function (err, decoded) {
    return user
      .findOne({ _id: decoded, token: token })
      .then((user) => user)
      .catch((err) => err);
  });
};

const User = mongoose.model("User", userSchema);

module.exports = { User };