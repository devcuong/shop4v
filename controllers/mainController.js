const express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
var multer = require("multer");
var fs = require("fs");
var path = require("path");
var crypto = require("crypto");
const mongoose = require("mongoose");
const TheLoai = mongoose.model("TheLoai");
const Truyen = mongoose.model("Truyen");
const navRender = require("../utils/navRender.js");
require('dotenv').config()
// trang chu
router.get("/", (req, res) => {
    var hostUrl = req.get('host').split(".");
    if (3 != hostUrl.length) {
        var perPage = 12;
        var page = parseInt(req.query.page) || 1;
        var skip = (perPage * page) - perPage;
        var q2 = Truyen.aggregate([{
            $lookup: { from: "chapter", localField: "_id", foreignField: "ma_truyen", as: "chap_moi_ra" }
        },
        {
            "$addFields": {
                "chap_moi_ra": { "$slice": ["$chap_moi_ra", -3] }
            }
        }
        ]).sort({ _id: -1 }).skip(skip).limit(perPage).exec(function (err2, truyens) {
            if (!err2) {
                Truyen.count().exec(function (err, count) {
                    res.render("home/noiDungTrangChu", {
                        layout: 'homeLayout.hbs',
                        lstTruyenDeCu: truyens,
                        lstTruyenCapNhat: truyens,
                        navRender: navRender.getNavRender(page, Math.ceil(count / perPage), "http://truyenra.com"),
                        pageTitle: "Đọc truyện tranh online - Truyện gì cũng có",
                        pageDescription: "❶❶✅ Web đọc truyện tranh online lớn nhất được cập nhật liên tục mỗi ngày - Cùng tham gia đọc truyện và thảo luận với hơn ✅10 triệu lượt người dùng tại Truyện Ra",
                        canonicalTag: process.env.SERVER_NAME + req.originalUrl
                    });
                });
            } else {
                console.log(err2);
            }
        })
    }
    else{
        console.log(hostUrl[0]);
    }
})
// trang chu
router.get("/hot", (req, res) => {
    var sortTruyen = { luot_xem: -1 };
    Truyen.find().sort(sortTruyen).exec(function (err, truyen) {
        if (!err) {
            res.render("home/noiDungTrangTimTruyen", {
                layout: 'homeLayout.hbs',
                lstTruyen: truyen,
                titleTrang: "TRUYỆN HOT",
                canonicalTag: process.env.SERVER_NAME + req.originalUrl
            })
        }
    });
})

// cấu hình multer
var storage = multer.diskStorage({

    // folder up file
    destination: 'public/upload',
    filename: function (req, file, cb) {
        crypto.pseudoRandomBytes(16, function (err, raw) {
            if (err) return cb(err)
            cb(null, Math.floor(Math.random() * 9000000000) + 1000000000 + path.extname(file.originalname))
        })
    }
});
var upload = multer({ storage: storage });

// load image va upload image
router.get("/files", function (req, res) {
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

router.post("/upload", upload.array("flFileUpload", 12), function (req, res, next) {
    res.redirect("back");
});

router.post("/delete_file", function (req, res, next) {
    var url_del = "public" + req.body.url_del
    if (fs.existsSync(url_del)) {
        fs.unlinkSync(url_del)
    }
    res.redirect("back");
});


module.exports = router;