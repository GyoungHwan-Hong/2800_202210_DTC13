const express = require('express');
const mongoose = require('mongoose');

const req = require('express/lib/request');
const res = require('express/lib/response');
const app = express();

const https = require('https');
const bodyparser = require("body-parser");
const cookieParser = require("cookie-parser");


const { User } = require("./public/models/User");
const { auth } = require("./public/middleware/auth");

const cors = require("cors");

var ejs = require("ejs");
app.set("view engine", "ejs");
app.engine("ejs", ejs.renderFile);


app.use(bodyparser.json());
app.use(cookieParser());

app.use(
    cors({
      origin: true,
      credentials: true, 
    })
  );

app.use(bodyparser.urlencoded({
    parameterLimit: 100000,
    limit: '50mb',
    extended: true
}))


app.listen(process.env.PORT || 5000, function (err) {
    if (err) console.log(err);
})


app.use(express.static('./public'));
app.get("/", (req, res) => res.sendFile("index.html"));


const dbAddress = "mongodb+srv://hongkh5218:recify5218@recifycluster.w6cp9.mongodb.net/recify?retryWrites=true&w=majority";

mongoose
    .connect(dbAddress, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log(err));


app.post("/doJoin", (req, res) => {
  const user = new User(req.body);
  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

app.post("/doLogin", (req, res) => {
  User.findOne({ ID: req.body.ID }, (err, user) => {
    if (err || !user) {
      return res.json({
        loginSuccess: false,
        message: "Invaild ID.",
      });
    }
    user
      .comparePassword(req.body.password)
      .then((isMatch) => {
        if (!isMatch) {
          return res.json({
            loginSuccess: false,
            message: "Invalid Password",
          });
        }
        user
          .generateToken()
          .then((user) => {
            res.cookie("x_auth", user.token).status(200).json({
              loginSuccess: true,
              userId: user._id,
            });
          })
          .catch((err) => {
            res.status(400).send(err);
          });
      })
      .catch((err) => res.json({ loginSuccess: false, err }));
  });
});

app.get("/api/user/auth", auth, (req, res) => {
  res.status(200).json({
    _id: req._id,
    isAdmin: req.user.role === 09 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image,
  });
});

app.post("/api/user/logout", auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, user) => {
    if (err) return res.json({ success: false, err });
    res.clearCookie("x_auth");
    return res.status(200).send({
      success: true,
    });
  });
});

app.use('/recipe/:id', function (req, res) {
    const url = `https://api.spoonacular.com/recipes/${req.params.id}/information?apiKey=44bee3db3d864814b2a115572ee2f5f4&includeNutrition=false`
    data = ""

    https.get(url, function (https_res) {
        https_res.on("data", function (chunk) {
            data += chunk
        })

        https_res.on("end", function () {
            data = JSON.parse(data)
            //console.log("Name: ", data.name)

            res.render("recipe.ejs", {
                "summary": data.summary,
                "title": data.title,
                "food_image": data.image
            });
        })
    })
})