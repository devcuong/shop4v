const express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const Truyen = mongoose.model("Truyen");
const TheLoai = mongoose.model("TheLoai");
const Chapter = mongoose.model("Chapter");
const stringHandle = require("../utils/stringHandle.js");
var ObjectId = require('mongoose').Types.ObjectId;
router.get("/", (req, res) => {
    var q = Truyen.find();
    q.exec(function(err, docs) {
        if (!err) {
            res.render("admin/quanLyTruyen", {
                layout: 'adminLayout.hbs',
                list: docs
            });
        }
    });
})

// thêm truyện
router.get("/add", (req, res) => {
    var q = TheLoai.find();
    q.exec(function(err, lstTheLoai) {
        if (!err) {
            res.render("admin/themSuaTruyen", {
                viewTitle: "THÊM SỬA TRUYỆN",
                lstTheLoai: lstTheLoai
            });
        }
    })
});

// Add thông tin truyện
router.post("/add", (req, res) => {
    if (req.body.truyenId == "") {
        insertRecord(req, res);
    } else
        updateRecord(req, res);
});

// update thông tin truyện
router.get("/edit/:id", (req, res) => {
    var idTruyen = req.params.id;
    var q = Truyen.findOne({ _id: new ObjectId(idTruyen) });
    q.exec(function(err, doc) {
        if (!err) {
            var q2 = TheLoai.find();
            q2.exec(function(err2, lstTheLoai) {
                if (!err2) {
                    res.render("admin/themSuaTruyen", {
                        viewTitle: "THÊM SỬA TRUYỆN",
                        lstTheLoai: lstTheLoai,
                        truyen: doc
                    });
                }
            })
        }
    });
});

// hàm thêm mới
function insertRecord(req, res) {
    var truyen = new Truyen();
    truyen.ten_truyen = req.body.tenTruyen;
    truyen.slug_truyen = stringHandle.changeToSlug(req.body.tenTruyen);
    truyen.tac_gia = req.body.tacGia;
    truyen.hinh_truyen = req.body.hinhTruyen;
    truyen.noi_dung = req.body.noiDung;
    var arrTheLoai = new Array();
    arrTheLoai = req.body.theLoai.trim().split(",");
    truyen.the_loai = arrTheLoai;
    truyen.so_chuong = "0";
    truyen.luot_xem = "0";
    truyen.luot_danh_gia = "0";
    truyen.xep_hang = "0";
    truyen.luot_theo_doi = "0";
    truyen.save((err, doc) => {
        if (!err) {
            res.redirect("/admin/truyen/");
        } else {
            if (err.name == "ValidationError") {
                res.render("admin/themSuaTruyen", {
                    viewTitle: "THÊM SỬA TRUYỆN"
                });
            } else
                console.log("Error during record insertion: ", err);
        }
    })
}


// hàm cập nhật
function updateRecord(req, res) {
    var foundTruyen = new Truyen();

    if (req.body.truyenId) {
        foundTruyen._id = new ObjectId(req.body.truyenId);
    }

    if (req.body.tenTruyen) {
        foundTruyen.ten_truyen = req.body.tenTruyen;
        foundTruyen.slug_truyen = stringHandle.changeToSlug(req.body.tenTruyen);
    }

    if (req.body.tacGia) {
        foundTruyen.tac_gia = req.body.tacGia;
    }

    if (req.body.hinhTruyen) {
        foundTruyen.hinh_truyen = req.body.hinhTruyen;
    }

    if (req.body.noiDung) {
        foundTruyen.noi_dung = req.body.noiDung;
    }

    if (req.body.theLoai) {
        var arrTheLoai = new Array();
        arrTheLoai = req.body.theLoai.trim().split(",");
        foundTruyen.the_loai = arrTheLoai;
    }

    Truyen.findByIdAndUpdate(new ObjectId(req.body.truyenId), foundTruyen, { new: true, strict: false, setDefaultsOnInsert: true }, function(err, doc) {
        if (!err) {
            res.redirect("/admin/truyen/");
        } else {
            if (err.name == "ValidationError") {
                res.redirect("admin/themSuaTruyen")
            } else
                console.log("Error during record update: " + err);
        }
    });
}
// xóa truyện
router.get("/delete/:id", (req, res) => {
    Chapter.remove({ ma_truyen: new ObjectId(req.params.id) }, function(err){
        if (!err) {
            Truyen.findByIdAndRemove(new ObjectId(req.params.id), (err2, doc) => {
                if (!err2) {
                    res.redirect("/admin/truyen/");
                } else {
                    console.log("Error in truyen delete: " + err2);
                }
            });
        } else {
            console.log("Error in truyen delete: " + err);
        }
    });
});
module.exports = router;