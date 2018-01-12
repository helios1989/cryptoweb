const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const request = require('request-promise');
const encrypt = require('./util/encrypt');
const assert = require('assert');
const jwt = require('jsonwebtoken');
const secretKey = process.env.SecretKey || 'secretKey'; //add secret key in server environment
const decrypt = require('bcryptjs');
const parser = require('rss-parser');

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

const baseIcoWatch = 'https://api.icowatchlist.com/public/v1/';
let externalRoutes = {
    upComingIco: baseIcoWatch + 'upcoming',
    liveIco: baseIcoWatch + 'live',
    finishedIco: baseIcoWatch + 'finished'
}
const optUrl = {
    url: ''
}

router.get('/redditnews/:token', function(req, res, next) {
    let token = req.params.token;
    parser.parseURL('https://www.reddit.com/r/' + token + '.rss', function(err, parsed) {
        res.json(parsed);
    });
})

router.get('/ethereumnews', function(req, res, next) {
    parser.parseURL('ethereumworldnews.com/feed', function(err, parsed) {
        res.json(parsed);
    });
})

//upcmoing ico
router.get('/incomingICO', function(req, res, next) {
    optUrl.url = externalRoutes.upComingIco;
    request(optUrl).then(data => {
        res.json(data);
    }).catch(err => {
        console.log(err);
    })
});

router.post('/verifyUser', ensureToken, function(req, res, next) {
    console.log(req.body.username);
    jwt.verify(req.token, req.body.username, function(err, data) {
        if (err) {
            res.sendStatus(403);
        } else {
            res.sendStatus(200);
        }
    });
})

function ensureToken(req, res, next) {
    const bearerheader = req.headers["authorization"];
    if (typeof bearerheader !== 'undefined') {
        const bearer = bearerheader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        res.sendStatus(403);
    }
}

//Live Ico
router.get('/liveICO', function(req, res, next) {
    optUrl.url = externalRoutes.liveIco;
    request(optUrl).then(data => {
        res.json(data);
    }).catch(err => {
        console.log(err);
    })
})

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
    }, req.body.username);

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
                return res.json(newUser)
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});
//signin
router.post('/signin', function(req, res, next) {
        let newUser = {
            username: req.body.username,
            token: ''
        }
        connection((db) => {
            db.collection('user-data')
                .findOne({ 'username': req.body.username })
                .then((response) => {
                    if (!response)
                        res.status(400).send('no username available');
                    newUser.token = response.token;
                    decrypt.compare(
                        req.body.password,
                        response.password
                    ).then(function(result) {
                        if (result) {
                            res.send(newUser);
                        } else {
                            res.status(400).send('uh oh something wrong');
                        }
                    });
                })
                .catch((err) => {
                    sendError(err, res);
                });
        });

    })
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
router.put('/users/:id', (req, res) => {
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