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