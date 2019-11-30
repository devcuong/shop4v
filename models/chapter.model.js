const mongoose = require('mongoose');
var chapterSchema = new mongoose.Schema({


    _id: {
        type: mongoose.Schema.Types.ObjectId,
        index: true,
        required: true,
        auto: true
    },
    ten_chuong: {
        type: String,
        required: "this file is required"
    },
    ma_truyen: {
        type: mongoose.Schema.Types.ObjectId
    },
    thoi_gian_tao: {
        type: String,
        default: Date.now
    },
    luot_xem: {
        type: String
    },
    server_truyen: [{
        _id: false,
        sv_original: String,
        sv_cdn: String
    }],
    server_1: [{
        type: String
    }],
    server_2: [{
        type: String
    }],
    nguon_truyen:{
        type: String
    }

}, {
    versionKey: false // You should be aware of the outcome after set to false
});
mongoose.model("Chapter", chapterSchema, "chapter");