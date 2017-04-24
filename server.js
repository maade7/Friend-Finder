/**
 * Created by maade on 4/23/17.
 */
var express = require("express"),
    bodyParser = require("body-parser"),
    mysql = require("mysql"),
    path = require("path");

var PORT = process.env.PORT || 8080;

var connection = mysql.createConnection({
    host     : 'localhost',
    port     : 3300,
    user     : 'root',
    password : 'maade',
    database : 'friendFinder'
});


connection.connect();

connection.query("", function (req, res) {

});

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
// app.use(express.static('app'));

// Routes
// =============================================================
require('./app/routing/apiRoutes.js')(app);
require('./app/routing/htmlRoutes.js')(app);

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});
