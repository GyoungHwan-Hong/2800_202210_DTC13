const express = require('express');
const req = require('express/lib/request');
const res = require('express/lib/response');
const app = express();
const https = require('https');
const bodyparser = require("body-parser");
var ejs = require("ejs");

app.set("view engine", "ejs"); 
app.engine("ejs", ejs.renderFile);


app.use(bodyparser.urlencoded({
    parameterLimit: 100000,
    limit: '50mb',
    extended: true
}))


app.set('view engine', 'ejs');
app.listen(process.env.PORT || 5000, function (err) {
    if (err) console.log(err);
})

app.use(express.static(__dirname + '/public'));


app.use('/recipe/:id', function (req, res) {

    const url = `https://api.spoonacular.com/recipes/${req.params.id}/information?apiKey=69f6b2d77b0e498f9c58c444875354ab&includeNutrition=false`
    data = ""
    end =""

    https.get(url, function (https_res) {
        https_res.on("data", function (chunk) {
            data += chunk
        })

        https_res.on("end", function () {
            data = JSON.parse(data)

            res.render("recipe.ejs", {
                "summary": data.summary,
                "title": data.title,
                "food_image": data.image
            });
        })
    })
})