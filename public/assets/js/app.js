// Wait to attach our handlers until the DOM is fully loaded.
$(function() {

    // Function to clear out all the events.
    function clear() {
        $(".event-section").empty();
    }

    // Run a scrape and display the results.
    $("#scrape-btn").on("click", function() {
        // Keep the page from reloading.
        event.preventDefault();

        // Empty the events section.
        clear();

        // Run the scaping route in controller.js with a GET request.
        $.ajax("/scrape", {
            type: "GET",
            function () {
                $('#scrapeModal').modal('show');
            }
        }).then(function() {
            // console.log("Scrape complete");
            // Reload the page to get the scraped data.
            $(".scrapeCloseBtn").on("click", function() {
                window.location.href = '/';
            });
        });
    });

    $(document).on("click", "#clear-btn", function() {
        // Keep the page from reloading.
        event.preventDefault();
        // Summon the warning modal to prevent accidental database drop.
        $('#warningModal').modal('show');
    });

    // Clear the scraped results.
    $("#destroy-btn").on("click", function() {
        // Keep the page from reloading.
        event.preventDefault();
        // Need to place reload here or it won't fire.
        location.reload();

        $.ajax({
            type: 'DELETE',
            url: '/deleteall',
            success: function(response) {
                if (response == 'error') {
                    console.log('Err!');
                }
            }
        });
    });

    // Save an Event as 'Going'
    $(".btn-going").on("click", function() {
        // Keep the page from reloading.
        event.preventDefault();
        // Immediately add color to button
        $(this).addClass("btn-success");
        // Read data attribute from button.
        var id = $(this).data("id");

        // Send the PUT request.
        $.ajax({
            url: "/saved-going/" + id,
            type: "PUT",
            success: function () {
                // Show the 'save' success message in the modal,
                // $('#saveEventModal').modal('show');
            }
        })
        // then update the page when the modal is closed.
        .then(function() {
            window.location.reload();
        });
    });

    // Save an Event as 'Interested'
    $(".btn-interested").on("click", function() {
        // Keep the page from reloading.
        event.preventDefault();
        // Immediately add color to button
        $(this).addClass("btn-success");
        // Read data attribute from button.
        var id = $(this).data("id");

        // Send the PUT request.
        $.ajax({
            url: "/saved-interested/" + id,
            type: "PUT",
            success: function () {
                // Show the 'save' success message in the modal,
                // $('#saveEventModal').modal('show');
            }
        })
        // then update the page when the modal is closed.
        .then(function() {
            // console.log("Event has been saved");
            // $(".saveEventCloseBtn").on("click", function() {
                window.location.reload();
            // });
        });
    });

    // Save an Event as 'Dismissed'
    $(".btn-dismiss").on("click", function() {
        // Keep the page from reloading.
        event.preventDefault();
        // Immediately add color to button
        $(this).addClass("btn-danger");
        // Read data attribute from button.
        var id = $(this).data("id");

        // Send the PUT request.
        $.ajax({
            url: "/saved-dismiss/" + id,
            type: "PUT",
            success: function () {
                // Show the 'save' success message in the modal,
                // $('#saveEventModal').modal('show');
            }
        })
        // then update the page when the modal is closed.
        .then(function() {
            // console.log("Event has been saved");
            // $(".saveEventCloseBtn").on("click", function() {
                window.location.reload();
            // });
        });
    });



    // Get all notes for an Event.
    $(".notes-btn").on("click", function() {
        // Keep the page from reloading.
        event.preventDefault();
        // Empty the notes from the note section
        $(".noteArea").empty();
        // Save the id from the button
        var eventId = $(this).attr("data-id");
        // Make the ajax call for the event
        $.ajax({
            method: "GET",
            url: "/getnotes/" + eventId,
            success: function () {
                // Open the notes modal
                $('#notesModal').modal('show');
            }
        })
        // Add the note information
        .then(function(data) {
            // console.log(data);
            var id = data._id;
            // Set the title in the header.
            $(".modal-title").html(data.title);
            // Create a data-id attribute for the button.
            $(".saveNoteBtn").attr("data-id", id);

            // If there's already a note for the event...
            if (data.notes) {
                console.log(data.notes);
                for (i=0; i<data.notes.length; i++) {
                    $(".noteArea").append(
                        "<div class='card-body notecard' id='notecard'>" + 
                            "<h4 class='notecardTitle' data-id='" + data.notes[i]._id + "'>" + 
                                data.notes[i].title + 
                            "</h4>" + 
                            "<button type='button' class='btn btn-danger deleteNote' data-id='" + data.notes[i]._id + "'>Delete</button>" + 
                        "</div>"
                    );
                    $(".noteArea").append(
                        "<hr>"
                    );
                }
            }
        });
    });

    // Retrieve a specific Note.
    $(document).on("click", ".notecardTitle", function() {
        var noteId = $(this).attr("data-id");
        console.log("noteId by title: " + noteId);

        // Run a GET request to update the note.
        $.ajax({
            method: "GET",
            url: "/getsinglenote/" + noteId
        })
        .then(function(data) {
            // Log the response
            console.log(data);

            // If the Note is found,
            if (data) {
                // place the title of the note in the title input,
                $("#titleinput").val(data.title);
                // place the body of the note in the body textarea.
                $("#bodyinput").val(data.body);
            }
        })
    });

    // Delete a specific Note.
    $(document).on("click", ".deleteNote", function() {
        var noteId = $(this).attr("data-id");
        console.log("noteId: " + noteId);

        // Run a POST request to delete the note.
        $.ajax({
            method: "DELETE",
            url: "/deletenote/" + noteId
        })
        .then(function(data) {
            // Log the response
            console.log(data);
            window.location.href = '/saved-events';
        })
    });

    // Save a Note.
    $(".saveNoteBtn").on("click", function() {
        var eventId = $(this).attr("data-id");
        $.ajax({
            url: "/postnotes/" + eventId,
            method: "POST",
            data: {
                // Value taken from title input
                title: $("#titleinput").val(),
                // Value taken from note textarea
                body: $("#bodyinput").val()
            }
        })
        .then(function(data) {
            // Log the response
            // console.log(data);
            window.location.href = '/saved-events';
        });
        // Also, remove the values entered in the input and textarea for note entry
        $("#titleinput").val("");
        $("#bodyinput").val("");
    });


    // Return (unsave) an Event.
    $(".return-btn").on("click", function() {
        // Keep the page from reloading.
        event.preventDefault();
        // Read data attribute from "return" button.
        var id = $(this).data("id");

        // Send the PUT request.
        $.ajax({
            url: "/returned/" + id,
            type: "PUT",
            success: function () {
                // Show the 'return' success message in the modal,
                $('#returnEventModal').modal('show');
            }
        })
        // then update the page when the modal is closed.
        .then(function() {
            // console.log("Event removed");
            $(".returnEventCloseBtn").on("click", function() {
                window.location.href = '/saved-events';
            });
        });
    });

})