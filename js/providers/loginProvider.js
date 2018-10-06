/**
 * All the functions related to login db are in this file.
 * Created by : Shrabanee
 * Date : 28/09/2018
 */
"use strict";

var dbProvider = require('./provider.js');

var ObjectID = require('mongodb').ObjectID;

class loginProvider {
    constructor() {
    }
    /**
     * 
     * @param {*} callback 
     */
    getCollection(callback) {
        dbProvider.getCollection('loginDetail', (error, collection) => {
            /**
             * If no collection
             */
            if( error ) {
                console.log(error);
                callback({msg:'@mCollLogin'});
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
                    ca : new Date(),
                    active : true
                };
                collection.insertOne(insertObj,(err, result) => {
                    if(err) {
                        console.log("Error in saving login detail: " + err);
                        callback(err);
                    }
                    else if(result && result.ops && result.ops.length) {
                        console.log("Inserted record on login");
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
    getActiveRecordByEmail(email, callback) {
        this.getCollection((err, collection) => {
            if(err) {
                console.log("Error in get collection getCustomerByEmail: " + err);
                callback(err);
            }
            else {
                collection.find({em : email, active: true}).toArray((err, result) => {
                    if(err) {
                        console.log("Error in find getCustomerByEmail: " + err);
                        callback(err);
                    }
                    else if(result && result.length) {
                        console.log("Active Record found for the user on login");
                        callback(null, result);
                    }
                    else callback(null, []);
                });
            }
        });
    };
    /**
     * 
     * @param {*} id 
     * @param {*} callback 
     */
    getActiveRecordById(id, callback) {
        this.getCollection((err, collection) => {
            if(err) {
                console.log("Error in get collection getActiveRecordById: " + err);
                callback(err);
            }
            else {
                collection.find({_id : ObjectID(id.toString()), active: true}).toArray((err, result) => {
                    if(err) {
                        console.log("Error in find getActiveRecordById: " + err);
                        callback(err);
                    }
                    else callback(null, result);
                });
            }
        });
    };
    /**
     * 
     * @param {*} email 
     * @param {*} updQuery 
     * @param {*} callback 
     */
    updateByQuery(email, updQuery, callback) {
        this.getCollection((err, collection) => {
            if(err) {
                console.log("Error in get collection updateByQuery: " + err);
                callback(err);
            }
            else {
                let updObj = {$set : {}};
                for(let i in updQuery) {
                    let curVal = updQuery[i];
                    updObj['$set'][i] = curVal;
                }
                collection.updateMany({em : email},updObj,(err, result) => {
                    if(err) {
                        console.log("Error in update updateByQuery: " + err);
                        callback(err);
                    }
                    else {
                        console.log("Updated active flag on login");
                        callback(null);
                    }
                });
            }
        });
    };
}
module.exports = new loginProvider();
