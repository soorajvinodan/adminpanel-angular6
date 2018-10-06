/**
 * Pigeon server.
 * Created by : Shrabanee
 * Date : 28/09/2018
 */
"use strict";

var port = process.env.PORT || 8060;
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const path = require('path');

let config = require('./config').config;
if(config.port) {
    port = config.port;
}

var express = require("express"),
    app = express(),
    http = require('http'),
    /**
    * Requiring bodyParser
    * It is used to parse the json and urlencoded data
    */
    bodyParser = require('body-parser');
    app.use(cookieParser());

var providerJs = require('./js/providers/provider'),
    initRoute = require('./js/routes/initRoutes'),
    loginSignupRoute = require('./js/routes/loginSignupRoutes'),
    adminRoutes = require('./js/routes/adminRoutes');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}) );
app.use(session({
    key : 'ses_id',
    secret: 'cnxKtd',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 6000000
    }
}));
app.use(passport.initialize());
app.use(passport.session());


//Serving static files to work in production env with out ng serve.
if(config.env !== "Dev") {
    if(config.env == "Prod") {
        app.all("/*", function(req, res, next){
            res.header('Access-Control-Allow-Origin', config.devBuildOrigin);
            res.header('Access-Control-Allow-Methods', 'GET,PUT,POST');
            res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
            next();
        });
    }
    else {
        app.all("/*", function(req, res, next){
            res.header('Access-Control-Allow-Origin', config.devBuildOrigin);
            res.header('Access-Control-Allow-Methods', 'GET,PUT,POST');
            res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
            next();
        });
    }

    app.use(express.static(path.join(__dirname, 'dist/pigeon-web/')));
    app.use('/signup', express.static(path.join(__dirname, 'dist/pigeon-web/')));
    app.use('/dashboard', express.static(path.join(__dirname, 'dist/pigeon-web/')));
    app.use('/login', express.static(path.join(__dirname, 'dist/pigeon-web/')));
}
else {
    app.all("/*", function(req, res, next){
        res.header('Access-Control-Allow-Origin', config.devUrlOrigin);
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST');
        res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
        next();
    });
}
app.use('/start',loginSignupRoute);
app.use('/class',initRoute);
app.use('/admin',adminRoutes);
providerJs.connectDb(function(err) {
    if(err) console.log(err);
    else {
        //Creating http server
        http.createServer(app).listen(port, err => {
            if (err) {
                throw err
            }
            
            console.log(`server is listening on ${port}...`)
        });
    }
});