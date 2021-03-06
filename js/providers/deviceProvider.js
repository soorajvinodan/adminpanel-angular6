/**
 * All the functions related to deviceDb are in this file.
 * Created by : Shrabanee
 * Date : 03/10/2018
 */
"use strict";

var dbProvider = require('./provider.js');

var ObjectID = require('mongodb').ObjectID;

class deviceProvider {
    constructor() {
    }
    getCollection(callback) {
        dbProvider.getCollection('deviceDetail', (error, collection) => {
            /**
             * If no collection
             */
            if( error ) {
                console.log(error);
                callback({msg:'@mCollDevice'});
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
                console.log("Error in get collection save: ");
                console.log(err);
                callback(err);
            }
            else {
                let insertObj = {
                    did : options.did,
                    live : true,
                    useStats:[{
                        st : new Date()
                    }],
                    appStats : [],
                    ca : new Date()
                };
                collection.insertOne(insertObj,(err, result) => {
                    if(err) {
                        console.log("Error in saving device record: ");
                        console.log(err);
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
     * @param {*} did 
     * @param {*} callback 
     */
    findByDid(did, callback) {
        this.getCollection((err, collection) => {
            if(err) {
                console.log("Error in get collection findByDid: ");
                console.log(err);
                callback(err);
            }
            else {
                collection.findOne({did : did.toString()}, (err, result) => {
                    if(err) {
                        console.log("Error in finding device record: ");
                        console.log(err);
                        callback(err);
                    }
                    else {
                        callback(null, result);
                    }  
                })
            }
        });
    }

    /**
     * 
     * @param {*} options 
     * @param {*} callback 
     */
    updateStats(options, callback) {
        let did = options.did;
        this.getCollection((err, collection) => {
            if(err) {
                console.log("Error in get collection findByDid: ");
                console.log(err);
                callback(err);
            }
            else {
                let updObj = {$push:{useStats : {
                        st : new Date()
                    }
                }}
                collection.updateOne({did : did.toString()},updObj, (err) => {
                    if(err) {
                        console.log("Error in updateStats device record: ");
                        console.log(err);
                        callback(err);
                    }
                    else {
                        callback(null);
                    }  
                })
            }
        });
    }

    /**
     * 
     * @param {*} did 
     * @param {*} query 
     * @param {*} callback 
     */
    insertApps(did, options, callback) {
        this.getCollection((err, collection) => {
            if(err) {
                console.log("Error in get collection insertApps: ");
                console.log(err);
                callback(err);
            }
            else {
                let updObj = {
                    $addToSet : {apps : options}
                }
                collection.updateOne({did : did.toString()}, updObj, (err) => {
                    if(err) {
                        console.log("Error in insertApps device record: ");
                        console.log(err);
                        callback(err);
                    }
                    else {
                        callback(null);
                    }  
                })
            }
        });
    }
}
module.exports = new deviceProvider();
