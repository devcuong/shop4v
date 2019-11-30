const express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const Truyen = mongoose.model("Truyen");
require('dotenv').config();
// Lấy thông tin của truyện
router.get("/", (req, res) => {
    res.render("home/noiDungTrangHistory", {
        layout: 'homeLayout.hbs',
        titleTrang: "LỊCH SỬ ĐỌC TRUYỆN",
        canonicalTag: process.env.SERVER_NAME + req.originalUrl
    })
});
module.exports = router;