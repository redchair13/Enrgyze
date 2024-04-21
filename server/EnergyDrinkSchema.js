const mongoose = require("mongoose");

const EnergyDrinkSchema = new mongoose.Schema({
    name: String,
    companyName: String,
    pictureIDs: Object, // this will be an array of pictures - PICTURE - DO LATER - prolly use GridFS or a link to picture
    description: String,
    ratings: [Number],
    commentIDs: Object, // this will be an array of all the comments
    upvoteCount: Number,
    tagIDs: Object, // array of tags
    caffieneContent: Number,
    nutritionFacts: Object, // PICTURE - DO LATER
    dateAdded: Number,
    dateLastModified: Number,
    ownerUserID: mongoose.Schema.Types.ObjectId
});

const EnergyDrink = mongoose.model("EnergyDrink", EnergyDrinkSchema);

module.exports = EnergyDrink;