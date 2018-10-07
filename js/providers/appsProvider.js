/**
 * All the functions related to apps DB are in this file.
 * Created by : Shrabanee
 * Date : 05/10/2018
 */
"use strict";

var dbProvider = require('./provider.js');

var ObjectID = require('mongodb').ObjectID;

class appsProvider {
    constructor() {
    }
    getCollection(callback) {
        dbProvider.getCollection('appsDetail', (error, collection) => {
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
    save(objToSave, callback) {
        this.getCollection((err, collection) => {
            if(err) {
                console.log("Error in get collection save: ");
                console.log(err);
                callback(err);
            }
            else {
                collection.insertOne(objToSave,(err, result) => {
                    if(err) {
                        console.log("Error in saving apps record: ");
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
                        console.log("Error in finding apps record: ");
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
                console.log("Error in get collection updateStats: ");
                console.log(err);
                callback(err);
            }
            else {
                let updObj = {$push:{useStats : {
                        st : new Date()
                        }
                    }, 
                    $set : {live : true}
                };
                collection.updateOne({did : did.toString(), appid : options.appid.toString()},updObj, (err) => {
                    if(err) {
                        console.log("Error in updateStats apps record: ");
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
module.exports = new appsProvider();
