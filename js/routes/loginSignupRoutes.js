/**
 * Pigeon signup and login routes.
 * Created by : Shrabanee
 * Date : 28/09/2018
 */
"use strict";
let loginReq = require('./loginSignupRequest');

module.exports = function(passport) {
    let express = require('express');
    let app = express();

    app.post("/register",loginReq.register);
    app.post("/login",loginReq.login);
    app.get("/checkLogin", loginReq.checkLogin);

    return app;
}();