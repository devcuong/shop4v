const express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const Video = mongoose.model("Video");
var multer = require("multer");
var crypto = require("crypto");
var path = require("path");
const dateFormat = require('dateformat');

// cấu hình multer
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/upload/video')
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname)
    },
    fileFilter: function(req, file, cb) {
        if (path.extname(file.originalname) !== '.jpg' ||
            path.extname(file.originalname) !== '.png' ||
            path.extname(file.originalname) !== '.gif' ||
            path.extname(file.originalname) !== '.jpeg') {
            return cb(new Error('Only image are allowed'))
        }

        cb(null, true)
    }

});

var upload = multer({ storage: storage });

/*lấy video*/
router.get("/", (req, res) => {
    Video.find((err, docs) => {
        if (!err) {
            res.render("admin/quanLyVideo", {
                list: docs
            });
        } else {
            console.log("Error in retrieving video list: " + err);
        }
    });
});
// xóa video
router.get("/delete/:id", (req, res) => {
    Video.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect("/admin/video");
        } else {
            console.log("Error in video delete: " + err);
        }
    });
});

// thêm video
router.get("/add", (req, res) => {
    res.render("admin/themSuaVideo", {
        viewTitle: "Thêm video",
    });
});

// sửa video
router.get("/edit/:id", (req, res) => {
    var tt = new Date().getTime();
    Video.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("admin/themSuaVideo", {
                viewTitle: "Update video",
                video: doc
            });
        }
    });
});

// action thêm/sửa video
// thêm/sửa video
router.post("/add", upload.any(), (req, res) => {
    if (req.body._id == "") {
        insertRecord(req, res);
    } else {
        updateRecord(req, res);
    }
});

// hàm thêm mới
function insertRecord(req, res) {
    var video = new Video();
    video.tieu_de = req.body.tieuDe;
    video.url_nhung = req.body.nguonDang;
    video.thoi_luong = req.body.thoiLuong;
    video.so_luot_xem = req.body.soLuotXem;
    video.nguon_dang = req.body.nguonDang;
    video.thoi_gian_dang = dateFormat(new Date(), "dd/mm/yyyy");
    video.save((err, doc) => {
        if (!err) {
            res.redirect("/admin/video");
        } else {
            if (err.name == "ValidationError") {
                handleValidationError(err, req.body);
                res.render("admin/themSuaVideo", {
                    viewTitle: "Thêm video"
                });
            } else
                console.log("Error during record insertion: ", err);
        }
    })
}

// hàm cập nhật
function updateRecord(req, res) {
    var foundVideo = new Video();
    if (req.body._id) {
        foundVideo._id = req.body._id;
    }
    if (req.body.tieuDe) {
        foundVideo.tieu_de = req.body.tieuDe;
    }

    if (req.body.urlNhung) {
        foundVideo.url_nhung = req.body.urlNhung;
    }

    if (req.body.thoiLuong) {
        foundVideo.thoi_luong = req.body.thoiLuong;
    }

    if (req.body.soLuotXem) {
        foundVideo.so_luot_xem = req.body.soLuotXem;
    }

    if (req.body.nguonDang) {
        foundVideo.nguon_dang = req.body.nguonDang;
    }

    if (req.file.originalname) {
        foundVideo.hinh_thumbnail = req.file.originalname;
    }
    foundVideo.thoi_gian_dang = dateFormat(new Date(), "dd/mm/yyyy");
    Video.findOneAndUpdate({ _id: req.body._id }, foundVideo, { new: true, strict: false, setDefaultsOnInsert: true }, function(err, doc) {
        if (!err) {
            res.redirect("/admin/video");
        } else {
            if (err.name == "ValidationError") {
                handleValidationError(err, req.body);
                res.render("admin/themSuaVideo", {
                    viewTitle: "Cập nhật video",
                    truyen: req.body
                });
            } else
                console.log("Error during record update: " + err);
        }
    });
}

// quản lý validation
function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case "tieu_de":
                body["tieuDeError"] = err.errors[field].message;
                break;
            case "hinh_bao":
                body["hinhBaoError"] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}
module.exports = router;