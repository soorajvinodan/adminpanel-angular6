/**
 * Pigeon admin request.
 * Created by : Shrabanee
 * Date : 04/10/2018
 */
"use strict";
let customerJs = require('../customer');

exports.addDevice = (req, res) => {
    let did = req.body.did,
    dname = req.body.dname,
    category = req.body.category,
    uid = req.body.uid;
    if(did && dname && category && uid) {
        let options = {
            did : did,
            dname : dname,
            category : category,
            uid : uid
        };
        customerJs.addDevice(options, (err) => {
            if(err) {
                res.json({status:'fail', msg : err.msg ? err.msg : err});
            }
            else res.json({status:'ok'});
        });
    }
    else {
        res.json({status:'fail', msg : "@invalidParams"});
    }
};

exports.getDevices = (req, res) => {
    let uid = req.params.uid;
    if(uid) {
        customerJs.getDevices(uid, (err, result) => {
            if(err) {
                res.json({status:'fail', msg : err.msg ? err.msg : err});
            }
            else res.json({status:'ok', result : result});
        });
    }
    else {
        res.json({status:'fail', msg : "@noUidInReq"});
    }
};