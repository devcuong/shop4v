const mongoose = require('mongoose');
var errorSchema = new mongoose.Schema({

    _id: {
        type: mongoose.Schema.Types.ObjectId,
        index: true,
        required: true,
        auto: true
    },
    error_chap: {
        type: String
    },
    mo_ta: {
        type: String
    },
    ngay_bao: {
        type: String
    }
}, {
    versionKey: false // You should be aware of the outcome after set to false
});
mongoose.model("Error", errorSchema, "error");