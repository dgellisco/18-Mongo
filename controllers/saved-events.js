                ///                            ///
                ///        DEPENDENCIES        ///
                ///                            ///

// EXPRESS
var express = require("express");
var router = express.Router();

// MODELS
var db = require("../models");


                ///                            ///
                ///           ROUTES           ///
                ///                            ///

        // ** ROUTES FOR SAVED ITEMS ** //

// Get all events from DB
router.get("/saved-events", function(req, res) {
    db.Events.find({})
    .then(function(eventsData) {
        // Save all data into handlebars object
        var hbsObject = {events:eventsData};
        console.log(hbsObject);
        res.render("index", hbsObject);
    })
    .catch(function(error) {
        res.json(error);
    });
});

// Get specific event from DB, populate with notes
router.get("/getnotes/:id", function(req, res) {
    // Find event by req.params.id
    db.Events.findOne(
        {_id: req.params.id}
    )
    // Populate with notes
    .populate("notes")
    .then(function(dbEvent) {
        res.json(dbEvent);
    })
    .catch(function(error) {
        res.json(error);
    });
});

// Save a note and assocaite with event
router.post("/postnotes/:id", function(req, res) {
    // Save note
    db.Notes.create(req.body)
    // Associate note
    .then(function(dbNote) {
        return db.Events.findOneAndUpdate(
            {_id: req.params.id},
            {$push:
                {notes: dbNotes._id}
            },
            {new: true}
        );
    })
    .then(function(dbEvent) {
        res.json(dbEvent);
    })
    .catch(function(error) {
        res.json(error);
    });
});

// Update a note
router.get("/getsinglenote/:id", function(req, res) {
    db.Notes.findOne(
        {_id: req.params.id}
    )
    .then(function(result) {
        res.json(result);
    })
    .catch(function(error) {
        res.json(error);
    });
});

// Delete a note
router.delete("/deletenote/:id", function(req, res) {
    db.Notes.remove(
        {_id: req.params.id}
    )
    .then(function (dbNote) {
        res.json(dbNote);
    })
    .catch(function(error) {
        res.json(error);
    });
});

// Unsave an event
router.put("/returned/:id", function(req, res) {
    // Update event saved from true to false
    db.Events.update(
        {_id: req.params.id},
        {saved: false}
    )
    .then(function(result) {
        res.json(result);
    })
    .catch(function(error) {
        res.json(error);
    });
});

module.exports = router;