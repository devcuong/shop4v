const express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const Chapter = mongoose.model("Chapter");
var ObjectId = require('mongoose').Types.ObjectId;
const Truyen = mongoose.model("Truyen");

// quản lý chapter trong truyện
router.get("/:idTruyen", (req, res) => {
    var idTruyen = req.params.idTruyen;
    var q = Chapter.find({ "ma_truyen": new ObjectId(idTruyen) });
    q.exec(function(err, docs) {
        if (!err) {
            res.render("admin/quanLyChapter", {
                layout: 'adminLayout.hbs',
                list: docs,
                idT: idTruyen
            });
        }
    });
})

// Update thông tin chapter theo truyện
router.get("/edit/:cid/:tid", (req, res) => {
    var chapId = req.params.cid;
    var truyenId = req.params.tid;
    Chapter.findById(new ObjectId(chapId), (err, chapterFounded) => {
        if (!err) {
            res.render("admin/themSuaChapter", {
                layout: 'adminLayout.hbs',
                viewTitle: "THÊM SỬA CHAPTER",
                chapter: chapterFounded,
                tId: truyenId
            });
        }
    });
})

// thêm chapter
router.get("/add/:idTruyen", (req, res) => {
    var idTruyen = req.params.idTruyen;
    res.render("admin/themSuaChapter", {
        viewTitle: "THÊM SỬA CHAPTER",
        tId: idTruyen
    });
});

// Add thông tin chapter
router.post("/add", (req, res) => {
    if (req.body.chapId == "")
        insertRecord(req, res);
    else
        updateRecord(req, res);
});

// hàm thêm mới
function insertRecord(req, res) {
    var truyenId = req.body.idTruyen;
    var q = Truyen.findOne({ "_id": new ObjectId(truyenId) });
    q.exec(function(err, doc) {
        if (!err) {
            doc.so_chuong = Number(doc.so_chuong) + 1;
            doc.save(function(errUpdate) {
                if (!errUpdate) {
                    var chapter = new Chapter();
                    chapter.ten_chuong = req.body.tenChuong;
                    chapter.ma_truyen = new ObjectId(req.body.idTruyen);
                    chapter.luot_xem = "0";
                    if (req.body.server1 && req.body.server2) {
                        var lstServer1 = req.body.server1.trim().split(',');
                        var lstServer2 = req.body.server2.trim().split(',');
                        for (var i = 0; i < lstServer1.length; i++) {
                            var sv = { sv_original: lstServer1[i], sv_cdn: lstServer2[i] };
                            chapter.server_truyen.push(sv);
                        }

                    }
                    chapter.save((err, doc) => {
                        if (!err) {
                            res.redirect("/admin/chapter/" + req.body.idTruyen);
                        } else {
                            if (err.name == "ValidationError") {
                                handleValidationError(err, req.body);
                                res.render("admin/themSuaChapter", {
                                    viewTitle: "THÊM SỬA CHAPTER"
                                });
                            } else
                                console.log("Error during record insertion: ", err);
                        }
                    })
                } else {
                    console.log(resp);
                }
            })
        }
    });
}


// hàm cập nhật
function updateRecord(req, res) {
    var foundChapter = new Chapter();

    if (req.body.chapId) {
        foundChapter._id = new ObjectId(req.body.chapId);
    }

    if (req.body.tenChuong) {
        foundChapter.ten_chuong = req.body.tenChuong;
    }

    if (req.body.idTruyen) {
        foundChapter.ma_truyen = req.body.idTruyen;
    }

    if (req.body.server1 && req.body.server2) {
        var lstServer1 = req.body.server1.trim().split(',');
        var lstServer2 = req.body.server2.trim().split(',');
        for (var i = 0; i < lstServer1.length; i++) {
            var sv = { sv_original: lstServer1[i], sv_cdn: lstServer2[i] };
            foundChapter.server_truyen.push(sv);
        }

    }
    Chapter.findByIdAndUpdate(new ObjectId(req.body.chapId), foundChapter, { new: true, strict: false, setDefaultsOnInsert: true }, function(err, doc) {
        if (!err) {
            res.redirect("/admin/chapter/" + req.body.idTruyen);
        } else {
            if (err.name == "ValidationError") {
                //handleValidationError(err, req.body);
                res.redirect("admin/chapter/edit/" + req.body._id + "/" + req.body.idTruyen)
            } else
                console.log("Error during record update: " + err);
        }
    });
}

// xóa chapter
router.get("/delete/:id/:idTruyen", (req, res) => {
    var truyenId = req.params.idTruyen;
    var q = Truyen.findOne({ "_id": new ObjectId(truyenId) });
    q.exec(function(err, doc) {
        if (!err) {
            doc.so_chuong = Number(doc.so_chuong) - 1;
            doc.save(function(errUpdate) {
                Chapter.findByIdAndRemove(new ObjectId(req.params.id), (err, doc) => {
                    if (!errUpdate) {
                        res.redirect("/admin/chapter/" + req.params.idTruyen);
                    } else {
                        console.log("Error in chapter delete: " + err);
                    }
                })
            })
        }
    });
})
module.exports = router;