/**
 * Pigeon init routes.
 * Created by : Shrabanee
 * Date : 28/09/2018
 */
"use strict";
let initReq = require('./initRequest');

module.exports = function() {
    let express = require('express');
    let app = express();

    app.get("/getClasses/:boardName",initReq.getClassAndUnits);
    app.post("/getInfoOfUnit",initReq.getInfoOfUnit);

    return app;
}();