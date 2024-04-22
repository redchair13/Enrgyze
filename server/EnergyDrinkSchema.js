const mongoose = require("mongoose");

const EnergyDrinkSchema = new mongoose.Schema({
    name: String,
    companyName: String,
    pictureIDs: Object, // this will be an array of pictures - PICTURE - DO LATER - prolly use GridFS or a link to picture
    description: String,
    ratings: [Number], // we will have to calculate the average every time we want to display it
    upvoteCount: Number,
    tagIDs: String, 
    caffieneContent: Number,
    calories: Number,
    sugar: Number,
    dateAdded: Number,
    dateLastModified: Number,
    ownerUserID: mongoose.Schema.Types.ObjectId
});

const EnergyDrink = mongoose.model("EnergyDrink", EnergyDrinkSchema);

module.exports = EnergyDrink;