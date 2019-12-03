const mongoose = require('mongoose');
var themeSchema = new mongoose.Schema({

    _id: {
        type: mongoose.Schema.Types.ObjectId,
        index: true,
        required: true,
        auto: true
    },
    ten_web: {
        type: String
    },
    mau_web: {
        type: String
    }
}, {
    versionKey: false // You should be aware of the outcome after set to false
});
mongoose.model("Theme", themeSchema, "theme");