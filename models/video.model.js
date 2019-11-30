const mongoose = require('mongoose');
var videoSchema = new mongoose.Schema({
    tieu_de: {
        type: String
    },
    url_nhung: {
        type: String
    },
    thoi_luong: {
        type: String
    },
    so_luot_xem: {
        type: String
    },
    nguon_dang: {
        type: String
    },
    thoi_gian_dang: {
        type: String
    },
    hinh_thumbnail:{
        type: String
    }
}, {
    versionKey: false // You should be aware of the outcome after set to false
});
mongoose.model("Video", videoSchema, "video");