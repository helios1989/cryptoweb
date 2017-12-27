const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const request = require('request');
const encrypt = require('./util/encrypt');
const assert = require('assert');
const jwt = require('jsonwebtoken');
const secretKey = process.env.SecretKey || 'secretKey'; //add secret key in server environment

// Connect
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').load();
}
//will change base to setCONVIG
const mongo_connection = process.env.MONGODB_DEV_URI || 'mongodb://vergel:vergel@ds155424.mlab.com:55424/cryptoweb';
const connection = (closure) => {
    return MongoClient.connect(mongo_connection, (err, db) => {
        if (err) return console.error(err);
        closure(db);
    });
};

// Error handling
const sendError = (err, res) => {
    response.status = 501;
    response.message = typeof err == 'object' ? err.message : err;
    res.status(501).json(response);
};

// Response handling
let response = {
    status: 200,
    data: [],
    message: null
};

let externalRoutes = {
    upComingIco: 'https://api.icowatchlist.com/public/v1/upcoming'
}

//upcmoing ico
router.get('/incomingICO', function(req, res, next) {
    // res.json({ "health": "ok" });
    //TODO change to axios or bluebird for promise support
    request(externalRoutes.upComingIco, function(error, response, body) {
        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        // console.log('body:', body); // Print the HTML for the Google homepage.
        res.json(body);
    });
});

//HEALTH CHECK
router.get('/health-check', (req, res) => {
    res.json({ "status": "ok" });
});

//CRYPTOGRAM API ROUTES
/* Register Account
 * type POST
 * @url /api/newUser
 *  * @type post
 * @url /api/newUser
 * @param {username} username
 * @param {password} password
 * @param {name} name
 * @param {email} email
 */
router.post('/newUser', (req, res) => {

    if (!req.body.username || !req.body.name || !req.body.password || !req.body.email) {
        sendError("Invalid user input must provide a username and fullname or password.", res)
    }
    //1 hour expiration
    let token = jwt.sign({
        id: 3
    }, req.body.username, { expiresIn: '1h' });

    let newUser = {
        username: req.body.username,
        password: encrypt.hashPassword(req.body.password),
        fullname: req.body.fullname,
        email: req.body.email,
        token: token
    }
    connection((db) => {
        db.collection('user-data')
            .insertOne(newUser)
            .then((user) => {
                // db.collection('user-data').createIndex({ "email": 1 }, { unique: true })
                return res.json({ 'ok': '200' });
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});
//get list of users
router.get('/users', function(req, res, next) {
    connection((db) => {
        db.collection('user-data')
            .find()
            .toArray()
            .then((users) => {
                response.data = users;
                res.json(response);
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});
//get specific users
router.get('/users/:id', (req, res) => {
    let newId = new ObjectID(req.params.id);
    console.log('testing', newId);
    if (ObjectID.isValid(req.params.id)) {
        console.log('valid');
        connection((db) => {
            db.collection('user-data')
                .findOne({ _id: new ObjectID(req.params.id) })
                // .findOne({ username: req.params.username })
                .then((data) => {
                    // response.data = data;
                    res.json(data);
                })
                .catch((err) => {
                    sendError(err, res);
                });
        });
    }
});

/**
 * Delete a users
 *
 * @section users
 * @type delete
 * @url /users/:id
 */
router.delete('/users/:id', (req, res) => {
    if (ObjectID.isValid(req.params.id)) {
        connection((db) => {
            db.collection('user-data')
                .deleteOne({ _id: new ObjectID(req.params.id) })
                .then((student) => {
                    response.data = req.params.id;
                    res.json(response);
                })
                .catch((err) => {
                    sendError(err, res);
                });
        });
    }
});



/**
 * Update a user
 *
 * @section user
 * @type put
 * @url /users/:id
 * @param {string} username
 * @param {string} fullname
 * @param {string =} password
 * @param {string =} email
 */
router.put('/user/:id', (req, res) => {
    if (ObjectID.isValid(req.params.id)) {
        var updateDoc = req.body;
        delete updateDoc._id;
        connection((db) => {
            db.collection('user-data')
                .updateOne({ _id: ObjectID(req.params.id) }, updateDoc)
                .then((student) => {
                    updateDoc._id = ObjectID(req.params.id);
                    response.data = updateDoc;
                    res.json(response);
                })
                .catch((err) => {
                    sendError(err, res);
                });
        });
    }
});


module.exports = router;