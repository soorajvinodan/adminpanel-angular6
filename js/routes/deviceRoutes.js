/**
 * Pigeon device routes.
 * Created by : Shrabanee
 * Date : 05/10/2018
 */
"use strict";
let deviceReq = require('./deviceRequests');

module.exports = function() {
    let express = require('express');
    let app = express();

    app.post('/updateDeviceStats', deviceReq.updateDeviceStats);
    // app.get('/getDevices/:uid', adminReq.getDevices);

    return app;
}();