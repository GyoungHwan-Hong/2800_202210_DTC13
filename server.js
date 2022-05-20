const express = require('express');
const mongoose = require('mongoose');

const req = require('express/lib/request');
const res = require('express/lib/response');
const app = express();

const https = require('https');
const bodyparser = require("body-parser");


const { User } = require("./public/models/User");
const { auth } = require("./public/middleware/auth");

var ejs = require("ejs");
app.set("view engine", "ejs");
app.engine("ejs", ejs.renderFile);


app.use(bodyparser.urlencoded({
    parameterLimit: 100000,
    limit: '50mb',
    extended: true
}))


app.listen(process.env.PORT || 3000, function (err) {
    if (err) console.log(err);
})


app.use(express.static('./public'));
app.get("/", (req, res) => res.sendFile("index.html"));


const dbAddress = "mongodb+srv://hongkh5218:recify5218@recifycluster.w6cp9.mongodb.net/?retryWrites=true&w=majority";

mongoose
    .connect(dbAddress, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log(err));

const UserSchema = new mongoose.Schema ({
    Name: String,
    ID: String,
    Password: String
})

const UserModel = mongoose.model("UserInfo", UserSchema);


app.post("/register", (req, res) => {
    console.log(req.body);
    UserModel.create({
      Name: req.body.Name,
      ID: req.body.ID,
      Password: req.body.Password
    }, function (err, data) {
      if (err) {
        console.log("Error " + err);
      } else {
        console.log("Data " + data);
      }
      res.send("Insertion is successful");
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