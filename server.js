const express = require('express');
const app = express();
const path = require('path');
const request = require('request');
var bodyParser = require('body-parser');
var mongodb = require('mongodb');
var objectID = mongodb.ObjectID;

var db = '';

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
//create link to angular build directory for local use .env
process.env.MONGODB_URI = 'mongodb://vergel:vergel@ds029106.mlab.com:29106/heroku_dj330wf0';
const port = process.env.PORT || 8605;
//Connect to the database before starting the application server.
mongodb.MongoClient.connect(process.env.MONGODB_URI, function(err, database) {
    if (err) {
        console.log(err);
        process.exit(1);
    }
    //Save database object from the callback for reuse
    db = database;
    console.log("Database conection ready");
    // ForceSSL  middleware
})

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
app.listen(port, function(r, res) {
    console.log('listening  to ' + port);
});

// app.use(forceSSL());
app.use(express.static(__dirname + '/dist'));

app.get('/api/health-check', function(req, res, next) {
    res.json({ "status": "ok", "port": port });
});

app.get('/api/incomingICO', function(req, res, next) {
    // res.json({ "health": "ok" });
    request('https://api.icowatchlist.com/public/v1/upcoming', function(error, response, body) {
        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        // console.log('body:', body); // Print the HTML for the Google homepage.
        res.json(body);
    });
});

const handleError = function(res, reason, message, code) {
    console.log('Error : ' + reason);
    res.status(code || 500).json({ "error": message });
};


app.post("/api/newUser", function(req, res) {

    var item = {
        username: req.body.username,
        password: req.body.password,
        name: req.body.name
    };

    db.collection('user-data').insertOne(item, function(err, doc) {
        console.log(doc);
        if (err) {
            handleError(res, err.message, "Failed to create new contact.");
        } else {
            res.status(201).json(doc.ops[0]);
        }
    });
    res.send('save success');
});

app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname + '/dist/index.html'));
});