const mongoose = require('mongoose');
var tinTucSchema = new mongoose.Schema({
    tieu_de: {
        type: String
    },
    nguoi_dang: {
        type: String
    },
    noi_dung_ngan: {
        type: String
    },
    noi_dung: {
        type: String
    },
    nguon_dang: {
        type: String
    },
    ngay_dang: {
        type: String
    },
    hinh_bao: {
        type: String
    }
}, {
    versionKey: false // You should be aware of the outcome after set to false
});
mongoose.model("TinTuc", tinTucSchema, "tintuc");