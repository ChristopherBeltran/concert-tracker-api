const mongoose = require("mongoose");

const concertSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    venue: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Venue",
        required: true

    },
    artist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Artist",
        required: true
    }
})

const Concert = mongoose.model("Concert", concertSchema);

module.exports = Concert;