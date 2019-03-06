                ///                            ///
                ///        DEPENDENCIES        ///
                ///                            ///

// MONGOOSE
var mongoose = require("mongoose");
// Reference the Schema constructor
var Schema = mongoose.Schema;


                ///                            ///
                ///           SCHEMA           ///
                ///                            ///

// Create a new Schema
var EventsSchema = new Schema({
    artist: {
        type: String,
        required: true
    },
    venue: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    time: {
        type: String
    },
    momentjsstamp: {
        type: String
    },
    eventlink: {
        type: String
    },
    imgthumb: {
        type: String
    },
    ticketstatus: {
        type: String
    },
    supportact: {
        type: String,
    },
    saved: {
        type: Boolean,
        default: false
    },
    rsvp: {
        dismissed: {
            type: Boolean,
            default: false
        },
        interested: {
            type: Boolean,
            default: false
        },
        going: {
            type: Boolean,
            default: false
        }        
    },
    // store ID of note and link it to the note collection
    notes: [
        {
            type: Schema.Types.ObjectId,
            ref: "Notes"
        }
    ]
});

// Create a mongoose model using the Schema
var Events = mongoose.model("Events", EventsSchema);

// Export the Events model
module.exports = Events;