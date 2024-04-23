const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    posterUserID: mongoose.Schema.Types.ObjectId,
    posterUsername: String,
    drinkID: mongoose.Schema.Types.ObjectId,
    title: String,
    text: String,
    timePosted: Number
});

const comment = mongoose.model("comment", commentSchema);

module.exports = comment;