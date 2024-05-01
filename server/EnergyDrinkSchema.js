const mongoose = require("mongoose");

const EnergyDrinkSchema = new mongoose.Schema({
    name: String,
    companyName: String,
    description: String,
    ratings: [Number], // we will have to calculate the average every time we want to display it
    upvoteCount: Number,
    tagIDs: String, 
    caffeineContent: Number,
    calories: Number,
    sugar: Number,
    dateAdded: Number,
    dateLastModified: Number,
    ownerUserID: mongoose.Schema.Types.ObjectId,
    image: { 
        data: Buffer, // Binary data of the image
        contentType: String // type of the image (e.g., image/jpeg, image/png)
    }
});

const EnergyDrink = mongoose.model("EnergyDrink", EnergyDrinkSchema);

module.exports = EnergyDrink;