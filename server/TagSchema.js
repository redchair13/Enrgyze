const mongoose = require("mongoose");

const tagSchema = new mongoose.Schema({
    name: String
});

const tag = mongoose.model("tag", tagSchema);

module.exports = tag;