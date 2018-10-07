/**
 * All the functions related to device db are in this file.
 * Created by : Shrabanee
 * Date : 05/10/2018
 */
"use strict";

const deviceProvider = require('./providers/deviceProvider');
const appsProvider = require('./providers/appsProvider');
const async = require('async');

/**
 * 
 * @param {*} id 
 * @param {*} callback 
 */
exports.updateDeviceStats = (options, callback) => {
    if(options) {
        let did = options.did,
        actionType = options.type;
        /**
         * TODO
         * Check device is already present in the db or not.
         * If not present create a new record.
         * Else update the record.
         * Do the action based on type of stats coming with the request.
         */
        if(did && actionType) {
            deviceProvider.findByDid(did, (err, result) => {
                if(err) {
                    callback(err);
                }
                else if(result) {
                    //Update existing record.
                    if(actionType == 'bootUp') {
                        deviceProvider.updateStats(options, err => {
                            if(err) {
                                callback(err);
                            }
                            else {
                                callback(null);
                            }
                        });
                    }
                    else if(actionType == 'appStarted') {
                        if(options.appid && options.did) {
                            let found = false;
                            for(let i in result.apps) {
                                if(result.apps[i] && result.apps[i].appid.toString() == options.appid.toString()) {
                                    found = true;
                                    break;
                                }
                            }
                            if(found) {
                                appsProvider.updateStats(options, err => {
                                    if(err) {
                                        callback(err);
                                    }
                                    else {
                                        callback(null);
                                    }
                                }); 
                            }
                            else {
                                createAppAndUpdateDevice(result, options, err => {
                                    if(err) {
                                        callback(err);
                                    }
                                    else {
                                        callback(null);
                                    }
                                })
                            }
                        }
                        else {
                            console.log(options);
                            callback({msg : "missing did or appid"});
                        }
                    }
                    else {
                        console.log(options);
                        callback({msg : "not vaid"});
                    }
                }
                else {
                    //Create new record for device and app and update app record _id in device record.
                    createDeviceAndApps(options, err => {
                        if(err) {
                            callback(err);
                        }
                        else {
                            callback(null);
                        }
                    })
                }
            })
        }
        else {
            console.log(options);
            callback({msg : 'noDidOrTypeOptions'});
        }
    }
    else {
        callback({msg : 'noOptions'});
    }
}

/**
 * 
 * @param {*} options 
 * @param {*} callback 
 */
function createDeviceAndApps(options, callback) {
    let did = options.did,
        actionType = options.type;
    async.waterfall([
        callback => {
            if(actionType == 'bootUp' || actionType == 'appStarted') {
                let insertObj = {
                    did : did,
                    live : true,
                    useStats:[{
                        st : new Date()
                    }],
                    apps : [],
                    ca : new Date()
                };
                deviceProvider.save(insertObj, (err, result) => {
                    if(err) {
                        callback(err);
                    }
                    else {
                        callback(null, result);
                    }
                })
            }
            else {
                console.log(options);
                callback({msg : "not vaid"});
            }
        },
        (result, callback) => {
            if(actionType == 'bootUp') {
                callback(null, null);
            }
            else if(actionType == 'appStarted' && options.did && options.appid) {
                if(result && result.length) {
                    //create a record in appsDetail with did and _id of device record.
                    //Update device record appStats with app details.
                    let objToSave = {
                        did : did,
                        dRecordId : result[0]._id,
                        appid : options.appid.toString(),
                        name : options.appName,
                        live : true,
                        useStats:[{
                            st : new Date()
                        }]
                    };
                    appsProvider.save(objToSave, (err, result) => {
                        if(err) {
                            callback(err);
                        }
                        else {
                            callback(null, result);
                        }
                    })
                }
                else {
                    callback({msg : "Device not created"});
                }
            }
            else {
                console.log(options);
                callback({msg : "not vaid"});
            }
        },
        (result, callback) => {
            if(result && result.length) {
                //ToDo push app object in device appStats.
                let appsObj = {
                    appid : options.appid.toString(),
                    name : options.appName,
                    appRecordId : result[0]._id
                };
                deviceProvider.insertApps(did, appsObj, err => {
                    if(err) {
                        callback(err);
                    }
                    else {
                        callback(null);
                    }
                })
            }
            else {
                callback({msg : "app record not created createDeviceAndApps"});
            }
        }
    ], callback);
}

/**
 * 
 * @param {*} result 
 * @param {*} options 
 * @param {*} callback 
 */
function createAppAndUpdateDevice(result, options, callback) {
    let did = options.did;
    async.waterfall([
        (callback) => {
            //create a record in appsDetail with did and _id of device record.
            //Update device record appStats with app details.
            let objToSave = {
                did : did,
                dRecordId : result._id,
                appid : options.appid.toString(),
                name : options.appName,
                live : true,
                useStats:[{
                    st : new Date()
                }]
            };
            appsProvider.save(objToSave, (err, result) => {
                if(err) {
                    callback(err);
                }
                else {
                    callback(null, result);
                }
            })
        },
        (result, callback) => {
            if(result && result.length) {
                //ToDo push app object in device appStats.
                let appsObj = {
                    appid : options.appid.toString(),
                    name : options.appName,
                    appRecordId : result[0]._id
                };
                deviceProvider.insertApps(did, appsObj, err => {
                    if(err) {
                        callback(err);
                    }
                    else {
                        callback(null);
                    }
                })
            }
            else {
                callback({msg : "app record not created"});
            }
        }
    ], callback);
}