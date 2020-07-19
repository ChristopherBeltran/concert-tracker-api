const mongoose = require("mongoose");

const venueSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        location: {
            type: String,
            required: true
        }
    }
)

const Venue = mongoose.model("Venue", venueSchema);

module.exports = Venue;