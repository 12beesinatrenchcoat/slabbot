const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    id: {
        type: Number,
        required: true
    },
    exp: {
        type: Number,
        require: true
    }
})

module.exports = mongoose.model("model", userSchema);