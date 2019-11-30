const express = require("express");
var request = require("request");
var router = express.Router();
const mongoose = require("mongoose");
const Truyen = mongoose.model("Truyen");
const Chapter = mongoose.model("Chapter");
var ObjectId = require('mongoose').Types.ObjectId;
var cors = require('cors')
var sleep = require('system-sleep');
const stringHandle = require("../utils/stringHandle.js");
// Load trang leech truyện
router.get("/", (req, res) => {
    res.render("admin/trangLeechTruyen", {
        layout: 'adminLayout.hbs',
        titleTrang: "LEECH TRUYỆN"
    })
});

// Lấy thông tin của truyện
router.post("/", cors(), (req, res) => {
    var urlTruyen = req.body.url;
    var svTruyen = "http://chauau3.herokuapp.com/lay-truyen?id=" + urlTruyen;
    request(
        svTruyen,
        function(error, response, body) {
            if (error) {
                return "lỗi";
            } else {
                res.json(body);
            }
        });
});

// Lấy danh sach  truyện
router.post("/lay-danh-sach-truyen", cors(), (req, res) => {
    var urlTruyen = req.body.url;
    var svTruyen = "http://chauau3.herokuapp.com/lay-danh-sach-truyen?id=" + urlTruyen;
    console.log(svTruyen);
    request(
        svTruyen,
        function(error, response, body) {
            if (error) {
                return "lỗi";
            } else {
                res.json(body);
            }
        });
});

// thêm truyện
router.post("/them-truyen", cors(), (req, res) => {
    var truyen = new Truyen();
    Truyen.findOne({ slug_truyen: stringHandle.changeToSlug(req.body.tenTruyen) }, function(err, obj) {
        if (!err) {
            console.log(obj);
            if (obj !== null) {
                res.json("da-co");
            } else {
                truyen.ten_truyen = req.body.tenTruyen;
                truyen.slug_truyen = stringHandle.changeToSlug(req.body.tenTruyen);
                truyen.tac_gia = req.body.tacGia;
                truyen.nguon_net_truyen = req.body.nguonNetTruyen;
                truyen.hinh_truyen = req.body.hinhTruyen;
                truyen.noi_dung = req.body.noiDung;
                truyen.ngay_cap_nhat = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
                var arrTheLoai = new Array();
                arrTheLoai = req.body.theLoai.trim().split(",");
                var arrTheLoaiAdd = new Array();
                for (var i = 0; i < arrTheLoai.length; i++) {
                    arrTheLoaiAdd.push(arrTheLoai[i].trim());
                }
                truyen.the_loai = arrTheLoaiAdd;
                truyen.so_chuong = req.body.soChap;
                truyen.luot_xem = "0";
                truyen.luot_danh_gia = "0";
                truyen.xep_hang = "0";
                truyen.luot_theo_doi = "0";
                truyen.save((err, doc) => {
                    if (err) {
                        console.log(err);
                    } else {
                        res.json(doc._id);
                    }
                })
            }
        }
    });

})

// thêm chapter theo truyện
router.post("/them-chapter", cors(), (req, res) => {
    var svChapter = "http://chauau3.herokuapp.com/lay-chapter?id=" + req.body.url;
    request(
        svChapter,
        function(error, response, body) {
            if (error) {
                console.log(error);
            } else {
                var jsonChap = JSON.parse(body);
                var chapter = new Chapter();
                chapter.ten_chuong = jsonChap.ten_chuong;
                chapter.ma_truyen = new ObjectId(req.body.idTruyen);
                chapter.luot_xem = "0";
                chapter.server_truyen = jsonChap.server_truyen;
                chapter.thoi_gian_tao = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
                chapter.save((err, doc) => {
                    if (err) {
                        console.log(err);
                    } else {
                        res.json(doc._id);
                    }
                })
            }
        });
})

// check update
router.post("/update-chapter", cors(), (req, res) => {
    var svChapter = "http://chauau3.herokuapp.com/check-update?id=" + req.body.url + "&current=" + req.body.soChap;
    request(
        svChapter,
        function(error, response, body) {
            if (error) {
                return "lỗi";
            } else {
                var jsonChapUpdate = JSON.parse(body);
                var objectReturn = new Object;
                var keySuccess = "status";
                objectReturn[keySuccess] = true;
                if (req.body.soChap == jsonChapUpdate.so_chap) {
                    objectReturn[keySuccess] = false;
                } else {
                    var listChapter = jsonChapUpdate.danh_sach_chap;
                    for (var i = 0; i < listChapter.length; i++) {
                        var params = { idTruyen: req.body.idTruyen, url: listChapter[i] };
                        request.post({
                                url: 'http://localhost:3000/admin/leech/them-chapter',
                                form: params
                            },
                            function(error, response, body) {
                                if (!error) {
                                    var q = Truyen.findOne({ "_id": new ObjectId(req.body.idTruyen) });
                                    q.exec(function(err, doc) {
                                        if (!err) {
                                            doc.so_chuong = Number(doc.so_chuong) + 1;
                                            doc.ngay_cap_nhat = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
                                            doc.save(function(errUpdate) {
                                                if (errUpdate) {
                                                    console.log(errUpdate);
                                                }
                                            })
                                        }
                                    });
                                } else {
                                    console.log(error);
                                }
                            }
                        );
                        sleep(3 * 1000);
                    }
                }
                res.send(objectReturn);
            }
        })
})
module.exports = router;