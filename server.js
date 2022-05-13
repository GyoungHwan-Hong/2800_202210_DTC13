const express = require('express')
const app = express()
const https = require('https')


app.set('view engine', 'ejs');
app.listen(process.env.PORT || 5000, function (err) {
    if (err) console.log(err);
})

app.use(express.static('./public'));