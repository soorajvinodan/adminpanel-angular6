/**
 * Pigeon admin routes.
 * Created by : Shrabanee
 * Date : 04/10/2018
 */
"use strict";
let adminReq = require('./adminRequest');

module.exports = function() {
    let express = require('express');
    let app = express();

    app.post('/addDevice', adminReq.addDevice);
    app.get('/getDevices/:uid', adminReq.getDevices);

    return app;
}();