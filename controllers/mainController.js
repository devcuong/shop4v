const express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
var multer = require("multer");
var fs = require("fs");
var path = require("path");
var crypto = require("crypto");
const mongoose = require("mongoose");
const Theme = mongoose.model("Theme");
const navRender = require("../utils/navRender.js");
// trang chu
router.get("/", (req, res) => {
    var hostUrl = req.get('host').split(".");
    if (3 == hostUrl.length) {
        var q = Theme.findOne({ "ten_web": hostUrl[0] });
        q.exec(function(err, doc) {
            if (!err) {
                var tenTheme = "theme" + doc.mau_web;
                res.render(tenTheme + "/noiDungTrangChu", {
                    layout: tenTheme + '/homeLayout.hbs'
                })
            }
        })
    } else {
        console.log(hostUrl);
    }
})

// cấu hình multer
var storage = multer.diskStorage({

    // folder up file
    destination: 'public/upload',
    filename: function(req, file, cb) {
        crypto.pseudoRandomBytes(16, function(err, raw) {
            if (err) return cb(err)
            cb(null, Math.floor(Math.random() * 9000000000) + 1000000000 + path.extname(file.originalname))
        })
    }
});
var upload = multer({ storage: storage });

// load image va upload image
router.get("/files", function(req, res) {
    const images = fs.readdirSync("public/upload")
    var sorted = []
    for (let item of images) {
        if (item.split('.').pop() == 'png' ||
            item.split('.').pop() == 'jpg' ||
            item.split('.').pop() == 'jpeg' ||
            item.split('.').pop() == 'svg') {
            var abc = {
                "image": "/upload/" + item,
                "folder": "/"
            }
            sorted.push(abc)
        }
    }
    res.send(sorted);
});

router.post("/upload", upload.array("flFileUpload", 12), function(req, res, next) {
    res.redirect("back");
});

router.post("/delete_file", function(req, res, next) {
    var url_del = "public" + req.body.url_del
    if (fs.existsSync(url_del)) {
        fs.unlinkSync(url_del)
    }
    res.redirect("back");
});


module.exports = router;