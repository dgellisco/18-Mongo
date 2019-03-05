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
            $(document).on("click", ".btn-scrape-close", function() {
                setTimeout(function(){
                    location.reload();
                }, 2000);
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


})