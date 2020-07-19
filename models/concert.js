const mongoose = require("mongoose");

const concertSchema = new mongoose.Schema(
    {
        date: {
            type: Date,
            required: true    
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        venue: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Venue"
        },
        artist: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Artist"
        }
    }
)

const Concert = mongoose.model("Concert", concertSchema);

module.exports = Concert;