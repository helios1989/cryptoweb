// const express = require('express');
// const router = express.Router();
// const MongoClient = require('mongodb').MongoClient;
// const ObjectID = require('mongodb').ObjectId;

// //Connect
// if (process.env.NODE_ENV !== 'production') {
//     require('dotenv').load();
// }

// const mongo_connection = process.env.MONGODB_DEV_URI || 'mongodb://vergel:vergel@ds029106.mlab.com:29106/heroku_dj330wf0';
// const connection = (closure) => {
//     return MongoClient.connect(mongo_connection, (err, db) => {
//         if (err) return console.error(err);

//         closure(db);
//     });
// };

// // Error handling
// const sendError = (err, res) => {
//     response.status = 501;
//     response.message = typeof err == 'object' ? err.message : err;
//     res.status(501).json(response);
// };

// // Response handling
// let response = {
//     status: 200,
//     data: [],
//     message: null
// };

// //HEALTH CHECK
// router.get('/api/health-check', (req, res) => {
//     res.json({ "status": "ok", "port": port });
// });

// //CRYPTOGRAM API ROUTES
// /* Register Account
//  * type POST
//  * @url /api/newUser
//  *  * @type post
//  * @url /api/newUser
//  * @param {username} username
//  * @param {password} password
//  * @param {name} name
//  * @param {email} email
//  */
// router.post('/api/newUser', (req, res) => {
//     var newUser = req.body;
//     if (!req.body.username || !req.body.fullname || !req.body.password) {
//         sendError("Invalid user input must provide a username and fullname or password.", res)
//     }

//     connection((db) => {
//         db.collection('user-data')
//             .insertOne(newuser)
//             .then((student) => {
//                 response.data = student;
//                 res.json(response);
//             })
//             .catch((err) => {
//                 sendError(err, res);
//             });
//     });
// });