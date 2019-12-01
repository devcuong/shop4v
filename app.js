require("./models/db");
const express = require("express");
var app = express();
const path = require("path");
const exphbs = require("express-handlebars");
const bodyparser = require("body-parser");
const tintucController = require("./controllers/tintucController");
const videoController = require("./controllers/videoController");
const truyenController = require("./controllers/truyenController");
const leechController = require("./controllers/leechController");
const chapterController = require("./controllers/chapterController");
const mainController = require("./controllers/mainController");
const detailController = require("./controllers/detailController.js");
const timTruyenController = require("./controllers/timTruyenController.js");
const lichSuController = require("./controllers/lichSuController.js");

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
app.use("/admin/tin-tuc", tintucController);
app.use("/admin/video", videoController);
app.use("/admin/truyen", truyenController);
app.use("/admin/leech", leechController);
app.use("/admin/chapter", chapterController);
app.use("/", mainController);
app.use("/truyen-tranh", detailController);
app.use("/tim-truyen", timTruyenController);
app.use("/lich-su", lichSuController);
