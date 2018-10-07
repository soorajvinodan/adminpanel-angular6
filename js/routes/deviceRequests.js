/**
 * Pigeon device requests.
 * Created by : Shrabanee
 * Date : 05/10/2018
 */
"use strict";
let deviceJs = require('../device');

exports.updateDeviceStats = (req, res) => {
    let did = req.body.did,
    actionType = req.body.type;
    if(did && actionType) {
        deviceJs.updateDeviceStats(req.body, (err) => {
            if(err) {
                res.json({status:'fail', msg : err.msg ? err.msg : err});
            }
            else res.json({status:'ok'});
        });
    }
    else {
        res.json({status:'fail', msg : "noDidOrType"});
    }
};