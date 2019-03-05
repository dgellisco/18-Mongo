<!-- To do -->
HIGH PRIORITY
-------------
[✓] JS - Prevent scraping the same event twice
[✓] JS - If date (not time, but date) has passed, delete from database
[ ] JS - Make it a single page, with options to filter by new, interested, going, deleted


MEDIUM PRIORITY
---------------
[ ] JS - Page should refresh only after all scrapes are complete
[ ]    - Include a count of how many new events were added
[✓] JS - Sort by date
[ ] JS - REFACTOR CODE
[ ]    - Create reusable functions/methods
[✓]    - Create reusable functions/methods, especially in axios calls
[ ]    - Clean up handlebars
[ ]    - Clean up Mongo requests - delete old events, but then only add new events

LOW PRIORITY
------------
[ ] JS - Implement notes
[ ]    - Saves extra details
[ ]       - Artist information
[ ]       - Artist official website
[ ]       - Event cost (if available)
[ ]    - Peope can leave a note
[ ]    - Tag your name as interested, going, or something
[ ] JS - Send to friends
[ ] CSS - fade background, or have it stationary
[ ] JS - Add a login and multiple instances
[ ] JS - Add a little 'expand' section that lets you preview the artist with the YouTube search


<!-- Questions -->
[✓] Why is the third axios Bluebird Scrape not working?
[✓] - Can only res.send once in an axios request.  It will error out and exit if there is a second one.

[ ] How can I trigger JS events on the scraped page before scraping?