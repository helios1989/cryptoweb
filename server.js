const express = require('express');
const app = express();
const path = require('path');
const request = require('request');

const forceSSL = function() {
        return function(req, res, next) {
            if (req.headers['x-forwarded-proto'] !== 'https') {
                return res.redirect(
                    ['https://', req.get('Host'), req.url].join('')
                );
            }
            next();
        }
    }
    // ForceSSL middleware
const port = process.env.PORT || 8601;
app.listen(port, function(r, res) {
    console.log('listening to ' + port);
});

// app.use(forceSSL());
app.use(express.static(__dirname + '/dist'));


app.get('/api/v1/health-check', function(req, res, next) {
    // res.json({ "health": "ok" });
    request('https://api.icowatchlist.com/public/v1/upcoming', function(error, response, body) {
        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        // console.log('body:', body); // Print the HTML for the Google homepage.
        res.json(body);
    });
});

app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname + '/dist/index.html'));
});