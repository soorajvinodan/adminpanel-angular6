/**
 * All the functions related to customer db are in this file.
 * Created by : Shrabanee
 * Date : 28/09/2018
 */
"use strict";

var dbProvider = require('./provider.js');

var ObjectID = require('mongodb').ObjectID;

class classProvider {
    constructor() {
    }
    /**
     * 
     * @param {*} callback 
     */
    getCollection(callback) {
        dbProvider.getCollection('pigeonUserDetail', (error, collection) => {
            /**
             * If no collection
             */
            if( error ) {
                callback({msg:'@mCollCst'});
            }
            /**
             * If collection
             */
            else {
                callback(null, collection);
            }
        });
    };
    /**
     * 
     * @param {*} options 
     * @param {*} callback 
     */
    save(options, callback) {
        this.getCollection((err, collection) => {
            if(err) {
                console.log("Error in get collection save: " + err);
                callback(err);
            }
            else {
                let insertObj = {
                    em : options.em,
                    instnm : options.instnm,
                    una : options.name,
                    hpwd : options.hpwd,
                    salt : options.salt,
                    type : options.type,
                    ca : new Date()
                };
                collection.insertOne(insertObj,(err, result) => {
                    if(err) {
                        console.log("Error in saving Customer record: " + err);
                        callback(err);
                    }
                    else if(result && result.ops && result.ops.length) {
                        callback(null, result.ops);
                    }
                    else callback(null, []);
                });
            }
        });
    };
    /**
     * 
     * @param {*} email 
     * @param {*} callback 
     */
    getCustomerByEmail(email, callback) {
        this.getCollection((err, collection) => {
            if(err) {
                console.log("Error in get collection getCustomerByEmail: " + err);
                callback(err);
            }
            else {
                collection.find({em : email}).toArray((err, result) => {
                    if(err) {
                        console.log("Error in find getCustomerByEmail: " + err);
                        callback(err);
                    }
                    else if(result && result.length) {
                        callback(null, result);
                    }
                    else callback(null, []);
                });
            }
        });
    };

    /**
     * 
     * @param {*} options 
     * @param {*} callback 
     */
    addDeviceByUid(options, callback) {
        this.getCollection((err, collection) => {
            if(err) {
                console.log("Error in get collection addDeviceByUid: ");
                console.log(err);
                callback(err);
            }
            else {
                let uid = options.uid.toString();
                let findQuery = {_id : ObjectID(uid), 'devices.did' : { $ne : options.did.toString()}};
                let updQuery = {
                    $addToSet : {
                        devices : {
                            did : options.did.toString(),
                            dna : options.dname,
                            category : options.category.toLowerCase(),
                            ca : new Date()
                        }
                    }
                };
                collection.updateOne(findQuery,updQuery, (err, results) => {
                    if(err) {
                        console.log("Update device error");
                        console.log(err);
                        callback(err);
                    }
                    else {
                        if(results && results.result && results.result.nModified == 1){
                            callback(null);
                        }
                        else {
                            callback({msg : '@duplicateDid'});
                        }
                    }
                })
            }
        });
    }

    /**
     * 
     * @param {*} uid 
     * @param {*} callback 
     */
    getDevicesByUid(uid, callback) {
        this.getCollection((err, collection) => {
            if(err) {
                console.log("Error in get collection getCustomerByEmail: " + err);
                callback(err);
            }
            else if(uid){
                collection.findOne({_id : ObjectID(uid.toString())},{"devices" : 1}, (err, result) => {
                    if(err) {
                        console.log("Error in find getCustomerByEmail: " + err);
                        callback(err);
                    }
                    else {
                        let returnRes = {
                            _id : result._id,
                            devices : result.devices
                        }
                        callback(null, returnRes);
                    }
                });
            }
            else {
                callback({msg : '@noUid'});
            }
        });
    };
}
module.exports = new classProvider();