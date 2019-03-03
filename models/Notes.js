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
var NotesSchema = new Schema({
    title: {
        type: String
    },
    body: {
        type: String
    }
});

// Create a mongoose model using the Schema
var Notes = mongoose.model("Notes", NotesSchema);

// Export the Events model
module.exports = Notes;