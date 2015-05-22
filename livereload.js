livereload = require('livereload');
server = livereload.createServer(4000);
server.watch(__dirname + "/public");


/*
Author : Ben
File: Hello.js
 */

function Hi () {
    console.log("I Make Ideas come alive with code!")
}

