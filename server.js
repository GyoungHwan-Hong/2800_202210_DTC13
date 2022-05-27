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
var url = require('url');
const { request } = require('http');


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

app.get('/', function (req, res) {
    if (req.cookies.x_auth) {
        res.sendFile(__dirname + '/public/main.html');
    } else {
        res.sendFile(__dirname + '/public/index.html');
    }
})

// app.use(function(req, res, next) {
//     if (req.session.user == null){
// // if user is not logged-in redirect back to login page //
//         res.redirect('/');
//     }   else{
//         next();
//     }
// });

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
        if (err) return res.sendFile(__dirname + '/public/signup.html');
        return res.redirect('/')
    });
});

app.post("/doLogin", (req, res) => {
    User.findOne({ ID: req.body.ID }, (err, user) => {
        if (err || !user) {
            res.send("<script>alert('Invalid ID/Password.');location.href='/signup.html';</script>");
            return res.sendFile(__dirname + '/public/signup.html');
        }
        user
            .comparePassword(req.body.password)
            .then((isMatch) => {
                if (!isMatch) {
                    res.send("<script>alert('Invalid ID/Password.');location.href='/signup.html';</script>");
                    return res.sendFile(__dirname + '/public/signup.html');
                }
                user
                    .generateToken()
                    .then((user) => {
                        res.cookie("userNickName", user.nickname);
                        res.cookie("x_auth", user.token);
                        res.sendFile(__dirname + '/public/main.html');
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
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        nickname: req.user.nickname,
        cellphone: req.user.cellphone,
    });
});

app.get("/logout", auth, (req, res) => {

    User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, user) => {
        if (err) return res.sendFile(__dirname + '/public/login.html');
        res.clearCookie("x_auth");
        res.clearCookie("userNickName");
        return res.sendFile(__dirname + '/public/login.html');
    });
});


const reviewSchema = new mongoose.Schema({
    userID: String,
    recipeID: String,
    rating: Number,
    time: String,
    comment: String
});

const reviewModel = mongoose.model("reviews", reviewSchema);


// app.get("/profile", (req, res)  => {
//     if (!req.cookies.x_auth) {
//         return res.sendFile(__dirname + '/public/login.html');
//     } else {
//         User.find({ ID: req.user.ID }, function (err, data) {
//             if (err) {
//               console.log("Error " + err);
//             } else {
//               console.log("Data " + data);
//             }
//             res.render("profile.ejs", {
//               "id": data[0].ID,
//               "email": data[0].email,
//               "nickname": data[0].nickname,
//               "phone": data[0].cellphone
//             });
//           });
//     }
// })

app.get('/profile', auth, function (req, res) {

    //console.log("received a request for "+ req.params.city_name);
    User.find({ ID: req.user.ID }, function (err, data) {
      if (err) {
        console.log("Error " + err);
      } else {
        console.log("Data " + data);
      }
      res.render("profile.ejs", {
        "id": data[0].ID,
        "email": data[0].email,
        "nickname": data[0].nickname,
        "phone": data[0].cellphone
      });
    });
  })


app.get("/getReviews", (req, res)  => {
    if (!req.cookies.x_auth) {
        return res.sendFile(__dirname + '/public/login.html');
    } else {
    reviewModel.find().sort({ _id: -1 }).then(results => {
        res.render('timeline.ejs', { result: results })
    })
    .catch(err => console.error(error))
    }
})

app.post("/writeReview", auth, (req, res) => {
    let today = new Date();
    reviewModel.create({
        userID: req.user.ID,
        recipeID: req.body.RecipeID,
        rating: req.body.rating,
        time: today,
        comment: req.body.UserComments
    }, function (err, data) {
        if (err) {
          console.log("Error " + err);
        } else {
          console.log("Data " + data);
        }
        res.send("<script>alert('Success!!');location.href='/recipe/"+req.body.RecipeID+"';</script>");
      });
})

app.use('/recipe/:id', function (req, res) {
    const url = `https://api.spoonacular.com/recipes/${req.params.id}/information?apiKey=193b4c004ae84452834525430ca15590&includeNutrition=false`
    data = ""

    https.get(url, function (https_res) {
        https_res.on("data", function (chunk) {
            data += chunk
        })

        https_res.on("end", function () {
            data = JSON.parse(data)

            console.log(data.extendedIngredients[0].id);
            console.log(data.extendedIngredients[1].id);

            res.render("recipe.ejs", {
                "summary": data.summary,
                "title": data.title,
                "food_image": data.image,
                "food_ID": data.id,
                "Instructions": data.instructions,
                "Ingredients": data.extendedIngredients
            });
        })
    })
})



app.use(express.static('./public'));