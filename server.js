const express = require('express');
const req = require('express/lib/request');
const res = require('express/lib/response');
const app = express()
const https = require('https')
const bodyparser = require("body-parser");

app.use(bodyparser.urlencoded({
    parameterLimit: 100000,
    limit: '50mb',
    extended: true
}))


app.set('view engine', 'ejs');
app.listen(process.env.PORT || 5000, function (err) {
    if (err) console.log(err);
})

app.use(express.static('./public'));


app.use('/recipe/:id', function (req, res) {

    const url = `https://api.spoonacular.com/recipes/${req.params.id}/information?apiKey=598dbdb711b34618b52ffcd93f1e1104&includeNutrition=false`
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