const mongoose = require('mongoose');
var truyenSchema = new mongoose.Schema({

    _id: {
        type: mongoose.Schema.Types.ObjectId,
        index: true,
        required: true,
        auto: true
    },
    ten_truyen: {
        type: String
    },
    slug_truyen: {
        type: String
    },
    tac_gia: {
        type: String
    },
    nguon_net_truyen: {
        type: String
    },
    the_loai: [{
        type: String
    }],
    hinh_truyen: {
        type: String
    },
    noi_dung: {
        type: String
    },
    so_chuong: {
        type: String
    },
    luot_xem: {
        type: String
    },
    ngay_cap_nhat: {
        type: String
    },
    luot_danh_gia: {
        type: String
    },

    xep_hang: {
        type: Number
    },

    update_time: {
        type: String
    },

    luot_theo_doi: {
        type: String
    }

}, {
    versionKey: false // You should be aware of the outcome after set to false
});
mongoose.model("Truyen", truyenSchema, "truyen");