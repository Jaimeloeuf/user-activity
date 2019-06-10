'use strict'; // Enforce use of strict verion of JavaScript

/*	@Doc
    Default express app. Created in this module with misc. routes like ping and error handling routes like for 404.
    Before other routes for business logic is mounted onto the app.
*/

const express = require('express');
const app = express();

// Function returns uptime in ms. Self invoking partial application with startup time
const uptime = ((start_time) => () => Date.now() - start_time)(Date.now());

// Counter object to track number of occurences for different events
var counter = {
    req: 0,
    failures: 0
};
// Middleware to increase count of req, on each request received
app.use((req, res, next) => {
    ++counter.req;
    next();
});


// Ping Route to check server status
app.get('/ping', (req, res) => {
	/*	Things to return to client
		- Current number of users in DB
		- Load of the server
    */
    res.json({
        // @TODO Remove the hardcoded status number
        status: 200,

        // Current server response latency of the /ping request
        // latency: (Date.now() - req.start_time)

        // Note that counter is also updated with each call to "/ping"
        req_counts: counter,
        uptime: uptime()
    });
});


// 404 Handler for different type of requests
// Normal request middleware, called when no other route's are matched
app.use((req, res, next) => {
    // Wrap in try/catch in case rendering/send fails.
    try {
        // Log error either to error logs or to a logging service
        // Set status to indicate resource not found with default plain-text representation of the HTTP code
        res.sendStatus(404);
    } catch (err) {
        // 500 error middleware is called upon catching any errors
        next(err);
    }
});


/*  500 internal server error route handler

    To set a error status code other than 500,
    run either of the below code before passing error object, "err" into the "next" function

    res.status(401); // Set statusCode directly with the built in method
    OR
    err.code = 401; // Set the code as property of the object

    // Call the next function with the err object once the code is set.
    next(err);

    Note that an Error status code set with res.status() method will have precedence over err.code
*/
app.use((err, req, res, next) => {
    // Increase failure count of the counter object
    ++counter.failures;

    // Log error either to error logs or to a logging service
    console.error(err.stack);

    // Make sure that the status code is an error code
    if (res.statusCode < 400)
        res.status(err.code || 500);

    // End the request after making sure status code is set
    res.end();

    // Should the error message or something like below be sent back to the user?
});


// Export the express app to use.
module.exports = app;