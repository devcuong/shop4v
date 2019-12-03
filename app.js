require("./models/db");
const express = require("express");
var app = express();
const path = require("path");
const exphbs = require("express-handlebars");
const bodyparser = require("body-parser");
const mainController = require("./controllers/mainController");

app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(bodyparser.json());

app.set("views", path.join(__dirname, "/views/"));
app.use(express.static(path.join(__dirname, "/public")));
app.use('/images', express.static(__dirname + "/public/images"));

app.engine("hbs", exphbs({
    extname: "hbs",
    defaultLayout: "adminLayout",
    layoutsDir: __dirname + "/views/layouts/",
    partialsDir: __dirname + "/views/partials/",
    helpers: {
        if: function(operand_1, operator, operand_2, options) {
            var operators = {
                    'eq': function(l, r) { return l == r; },
                    'noteq': function(l, r) { return l != r; },
                    'gt': function(l, r) { return Number(l) > Number(r); },
                    'lt': function(l, r) { return Number(l) < Number(r); },
                    'or': function(l, r) { return l || r; },
                    'and': function(l, r) { return l && r; },
                    '%': function(l, r) { return (l % r) === 0; }
                },
                result = operators[operator](operand_1, operand_2);

            if (result) return options.fn(this);
            else return options.inverse(this);
        },
        inc: function(value, options) {
            return parseInt(value) + 1;
        },
        revArr: function(array) {
            array.reverse();
        }
    }
}));


app.set("view engine", "hbs");

app.listen(80, () => {
    console.log("Express server started at port : 80");
});
app.use("/", mainController);