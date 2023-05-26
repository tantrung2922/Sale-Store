const express = require("express");
const app = express();
app.use(express.static("public/css/"));
app.use(express.static("public/images/"));

app.get('/', (req, res) => {
    res.render("project/home.hbs");
})

module.exports = app;