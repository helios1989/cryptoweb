const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const app = express();
const externalApi = require('./api_routes/api');

//Parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

// Angular DIST output folder
app.use(express.static(path.join(__dirname, 'dist')));

//Api location new User
app.use('/api', externalApi);

app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname + '/dist/index.html'));
});

//Set Port
const port = process.env.PORT || 8605;
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => console.log(`Running on localhost:${port}`));