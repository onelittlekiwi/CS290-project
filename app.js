const express = require("express");
const handlebars = require("express-handlebars").create({
  defaultLayout: "main"
});
const bodyParser = require("body-parser");
const kiwiData = require("./data/kiwi.json");
const coconutData = require("./data/coconut.json");
const hazelData = require("./data/hazel.json");
const policyData = require("./data/policy.json");
const app = express();

app.use(bodyParser.urlencoded({ extended: false}));
app.use("/public", express.static("public"));
app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");
app.set("port", 8888);

app.get("/", function(req, res) {
   res.render("mainPage");
});

app.get("/pet/:name", function(req, res) {
    let context = {}
    if (req.params.name === "kiwi") {
        context = kiwiData;
    } else if (req.params.name === "coconut") {
        context = coconutData;
    } else if (req.params.name === "hazel") {
        context = hazelData;
    }
    res.render("pets", context);
});

app.get("/resources", function(req, res) {
    res.render("resources", policyData);
});

app.post("/", function(req, res) {
    let context = {};

    if (req.body["Subscribe"]) {
        context.name = req.body.name;
        context.email = req.body.email;
        res.render("subscribed", context);
    }
});

app.use(function(req, res) {
    res.status(404);
    res.render("404");
  });
  
app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.type("plain/text");
    res.status(500);
    res.render("500");
});

app.listen(app.get("port"), function() {
    console.log(
        "Express started on http://localhost:" +
        app.get("port") +
        "; press Ctrl-C to terminate."
    );
});
  