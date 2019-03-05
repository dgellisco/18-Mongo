                ///                            ///
                ///        DEPENDENCIES        ///
                ///                            ///

// EXPRESS
var express = require("express");
var router = express.Router();

// SCRAPING
var axios = require("axios");
var cheerio = require("cheerio");

// MOMENT
var moment = require("moment");

// MODELS
var db = require("../models");


                ///                            ///
                ///           ROUTES           ///
                ///                            ///

        // ** ROUTES FOR SCRAPING ** //

// Scrape Ogden Theatre
router.get("/scrape", function(req, res) {
    // Get body of html
    axios
    .get("https://www.ogdentheatre.com/events")
    .then(function(response) {

        // Load the response into cheerio and store it as a short-hand selector
        var $ = cheerio.load(response.data);

        // Save the desired information from the site
        $(".entry").each(function(i, element) {

            // Create an empty object
            var result = {};

            // Pull the desired information
            // Artist
            result.artist = $(this).find(".info").children(".title").children(".carousel_item_title_small").text().trim();
            // Location
            result.venue = "Ogden Theatre";
            // Date
            result.date = $(this).find(".info").children(".date-time-container").children(".date").text().trim();
            // Time
            result.time = $(this).find(".info").children(".date-time-container").children(".time").text().replace("Show", "").trim();
            // Time and Date
            result.momentjsstamp = moment(result.date + " " + result.time, "ddd, MMM D, YYYY h:mm a").format();
            console.log("ogden event time is " + result.momentjsstamp);
            // Event Link
            result.eventlink = $(this).find(".thumb").children("a").attr("href");
            // Image thumbnail
            result.imgthumb = $(this).find(".thumb").children("a").children("img").attr("src");
            // Ticket Status
            result.ticketstatus = $(this).find(".buttons").children("a").attr("title");

            // Create result in database
            db.Events.create(result)
            .then(function() {

            })
            .catch(function(error) {
                return res.json(error);
            });
                
        });

        // Send to client that scrape was completed
        // res.send("Ogden Theatre scrape complete");

        axios
        .get("https://www.gothictheatre.com/events")
        .then(function(response) {

            // Load the response into cheerio and store it as a short-hand selector
            var $ = cheerio.load(response.data);

            // Save the desired information from the site
            $(".entry").each(function(i, element) {

                // Create an empty object
                var result = {};

                // Pull the desired information
                // Artist
                result.artist = $(this).find(".info").children(".title").children(".carousel_item_title_small").text().trim();
                // Location
                result.venue = "Gothic Theatre";
                // Date
                result.date = $(this).find(".info").children(".date-time-container").children(".date").text().trim();
                // Time
                result.time = $(this).find(".info").children(".date-time-container").children(".time").text().replace("Show", "").trim();
                // Time and Date
                result.momentjsstamp = moment(result.date + " " + result.time, "ddd, MMM D, YYYY h:mm a").format();
                console.log("gothic event time is " + result.momentjsstamp);
                // Event Link
                result.eventlink = $(this).find(".thumb").children("a").attr("href");
                // Image thumbnail
                result.imgthumb = $(this).find(".thumb").children("a").children("img").attr("src");
                // Ticket Status
                result.ticketstatus = $(this).find(".buttons").children("a").attr("title");

                // Create result in database
                db.Events.create(result)
                .then(function() {

                })
                .catch(function(error) {
                    return res.json(error);
                });
                    
            });

            // Send to client that scrape was completed
            // res.send("Gothic Theatre scrape complete");

            axios
            .get("https://www.bluebirdtheater.net/events")
            .then(function(response) {

                // Load the response into cheerio and store it as a short-hand selector
                var $ = cheerio.load(response.data);

                // Save the desired information from the site
                $(".entry").each(function(i, element) {

                    // Create an empty object
                    var result = {};

                    // Pull the desired information
                    // Artist
                    result.artist = $(this).find(".info").children(".title").children(".carousel_item_title_small").text().trim();
                    // Location
                    result.venue = "Bluebird Theatre";
                    // Date
                    result.date = $(this).find(".info").children(".date-time-container").children(".date").text().trim();
                    // Time
                    result.time = $(this).find(".info").children(".date-time-container").children(".time").text().replace("Show", "").trim();
                    // Time and Date
                    result.momentjsstamp = moment(result.date + " " + result.time, "ddd, MMM D, YYYY h:mm a").format();
                    console.log("bluebird event time is " + result.momentjsstamp);
                    // Event Link
                    result.eventlink = $(this).find(".thumb").children("a").attr("href");
                    // Image thumbnail
                    result.imgthumb = $(this).find(".thumb").children("a").children("img").attr("src");
                    // Ticket Status
                    result.ticketstatus = $(this).find(".buttons").children("a").attr("title");

                    // Create result in database
                    db.Events.create(result)
                    .then(function() {

                    })
                    .catch(function(error) {
                        return res.json(error);
                    });
                        
                });

                // Send to client that scrape was completed
                res.send("Three scrapes complete");
            });

        });

    });
    
});


        // ** ROUTES TO SEND TO SERVER.JS ** //

// Get all saved events from DB
router.get("/", function(req, res) {
    db.Events.find({}, null, {sort: {"momentjsstamp": 1}})
    .then(function(eventsData) {
        // Save all data into handlebars object
        var hbsObject = {events: eventsData};
        // console.log(hbsObject);
        res.render("index", hbsObject);
    })
    .catch(function(error) {
        res.json(error);
    });
});

// Save an event as going
router.put("/saved-going/:id", function(req, res) {
    db.Events.find({_id: req.params.id})
    .then(function(eventData) {
        if (eventData[0].rsvp.going == false) {
            db.Events.update(
                {_id: req.params.id},
                {$set:
                    {
                        saved: true,
                        "rsvp.dismissed": false,
                        "rsvp.interested": false,
                        "rsvp.going": true
                    }
                }
            )
            .then(function(result) {
                res.json(result);
            })
            .catch(function(error) {
                res.json(error);
            });
        } else {
            db.Events.update(
                {_id: req.params.id},
                {$set:
                    {
                        saved: true,
                        "rsvp.interested": true,
                        "rsvp.going": false
                    }
                }
            )
            .then(function(result) {
                res.json(result);
            })
            .catch(function(error) {
                res.json(error);
            });
        }
    })
    .catch(function(error) {
        res.json(error);
    });
    
});

// Save an event as interested
router.put("/saved-interested/:id", function(req, res) {
    db.Events.find({_id: req.params.id})
    .then(function(eventData) {
        console.log(eventData[0].rsvp.interested)
        if (eventData[0].rsvp.interested == false) {
            db.Events.update(
                {_id: req.params.id},
                {$set:
                    {
                        saved: true,
                        "rsvp.dismissed": false,
                        "rsvp.interested": true,
                        "rsvp.going": false
                    }
                }
            )
            .then(function(result) {
                res.json(result);
            })
            .catch(function(error) {
                res.json(error);
            });
        } else {
            db.Events.update(
                {_id: req.params.id},
                {$set:
                    {
                        saved: false,
                        "rsvp.interested": false
                    }
                }
            )
            .then(function(result) {
                res.json(result);
            })
            .catch(function(error) {
                res.json(error);
            });
        }
    })
    .catch(function(error) {
        res.json(error);
    });
});

// Save an event as not interested (i.e. rsvp is blank)
router.put("/saved-dismiss/:id", function(req, res) {
    db.Events.find({_id: req.params.id})
    .then(function(eventData) {
        console.log(eventData[0].rsvp.dismissed)
        if (eventData[0].rsvp.dismissed == false) {
            db.Events.update(
                {_id: req.params.id},
                {$set:
                    {
                        saved: true,
                        "rsvp.dismissed": true,
                        "rsvp.interested": false,
                        "rsvp.going": false
                    }
                }
            )
            .then(function(result) {
                res.json(result);
            })
            .catch(function(error) {
                res.json(error);
            });
        } else {
            db.Events.update(
                {_id: req.params.id},
                {$set:
                    {
                        saved: false,
                        "rsvp.dismissed": false
                    }
                }
            )
            .then(function(result) {
                res.json(result);
            })
            .catch(function(error) {
                res.json(error);
            });
        }
    })
    .catch(function(error) {
        res.json(error);
    });
});

// Reset
router.delete("/deleteall", function(req, res, next) {
    db.Events.remove({}, function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log("event history reset");
        }
    })
    .then(function () {
        db.Notes.remove({}, function(err) {
            if (err) {
                console.log(err);
            } else {
                console.log("rsvp history reset");
            }
        })
    })
});

module.exports = router;