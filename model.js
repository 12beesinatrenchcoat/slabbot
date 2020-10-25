const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    _id: {
        type: String,
        required: true
    },
    exp: {
        type: Number,
        default: 0
    },
    lastMessageDate: Date,
    stats: Object
}, { minimize: false });

module.exports = mongoose.model("user", userSchema);