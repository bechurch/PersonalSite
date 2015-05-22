// server.js
var koa = require('koa');
var app = koa();
var common = require('koa-common');
var route = require('koa-route');
var parse = require('co-body');
var nodemailer = require('nodemailer');
var validator = require("email-validator");
var config = require('./config')
var views = require("co-views");
var render = views("public", { map: { html: 'swig' }});


// create reusable transporter object using SMTP transport
var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: config.gmail.user,
        pass: config.gmail.pass
    }
});

// enable logger middleware
app.use(common.logger('dev'));

// enable static middleware
app.use(common.static(__dirname + '/public'));


app.use(route.post('/', function *(next) {
    var form = yield parse(this);
    if (validator.validate(form.email) || !form.message) {
        var mailOptions = {
            from: form.name + ' <' + form.email + '>', // sender address
            to: config.gmail.user, // list of receivers
            subject: 'Personal Site: ' + form.subject, // Subject line
            text: 'Name: ' + form.name + '\nEmail: ' + form.email + '\n\n' + form.message // plaintext body
        };
        transporter.sendMail(mailOptions, function(error, info){
            if(error){
                console.log(error);
            }else{
                console.log('Message sent: ' + info.response);
            }
        });
    }
    else {
        console.log('Did not send due to invalid email: ' + form.email);
    }

    this.redirect('/');
}));

app.use(route.get('/Cabins', function *() {
 this.body = yield render('hillside/index');
}));

app.use(route.get('/FlappyCanmore', function *() {
    this.body = yield render('canmore/index');
}));

app.use(route.get('/SunWatch', function *() {
    this.body = yield render('sun_watch/index');
}));


var server = app.listen(config.port, function () {
    console.log('Listening on port %d', server.address().port);
});
