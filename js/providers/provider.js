/**
 * Provider js file. Open connection to all the db and indexings for each of the db.
 * Created by : Shrabanee
 * Date : 28/09/2018
 */
"use strict";
/**
 * Getting the url for different database from config file
 */
const Config = require('../../config.js').config;
const url = Config.connectDatabase();
var MongoClient = require('mongodb').MongoClient, selectedDB;
const async = require('async');
let classDB = null, customerDb = null, deviceDb = null, appDb = null;
/**
 * This method creates a connection to database at once in the initialization of application.
 */
exports.connectDb = function(callback) {
    async.series([
        callback =>  {
            MongoClient.connect(url.classDbUrl,{ useNewUrlParser: true },function(err,classInstance) {

                /**
                 * If error in connecting then call callback with error message
                 */
                if(err) {
                    console.log("Error in connecting classDb");
                    callback(err);
                }
                else {
                    classDB = classInstance;
                    console.log("ClassDb Connected");
                    callback(null);
                }
            });
        },
        callback =>  {
            MongoClient.connect(url.pigeonUsrDbUrl,{ useNewUrlParser: true },(err,instance) =>  {

                /**
                 * If error in connecting then call callback with error message
                 */
                if(err) {
                    console.log("Error in connecting pigeonUsrDb");
                    callback(err);
                }
                else {
                    customerDb = instance;
                    console.log("PigeonCustomerDb Connected");
                    callback(null);
                }
            });
        },
        callback =>  {
            MongoClient.connect(url.deviceDbUrl,{ useNewUrlParser: true },(err,instance) =>  {

                /**
                 * If error in connecting then call callback with error message
                 */
                if(err) {
                    console.log("Error in connecting deviceDb");
                    callback(err);
                }
                else {
                    deviceDb = instance;
                    console.log("deviceDb Connected");
                    callback(null);
                }
            });
        },
        callback =>  {
            MongoClient.connect(url.appsDbUrl,{ useNewUrlParser: true },(err,instance) =>  {

                /**
                 * If error in connecting then call callback with error message
                 */
                if(err) {
                    console.log("Error in connecting appsDb");
                    callback(err);
                }
                else {
                    appDb = instance;
                    console.log("appsDb Connected");
                    callback(null);
                }
            });
        }
    ],
    (err) => {
        if(err) {
            console.log(err);
            callback(err);
        }
        else {
            ensureIndexes(function(error){
                callback(error);
            });
        }
    });
};

/**
 * This method is used to create collections for different databases.
 * @param {*} collectionName 
 * @param {*} callback 
 */
function getCollection(collectionName, callback) {
    var selectedDB;
	switch(collectionName)
{
		case 'classDetail': selectedDB = classDB; break;
        case 'pigeonUserDetail': selectedDB = customerDb; break;
        case 'loginDetail': selectedDB = customerDb; break;
        case 'deviceDetail': selectedDB = deviceDb; break;
        case 'appsDetail': selectedDB = appDb; break;
    }
    /**
     * LoginDetail is created under pigeonUserDetail.
     */
    if(collectionName === "loginDetail") {
        var db = selectedDB.db("pigeonUserDetail");
    }
    else var db = selectedDB.db(collectionName);
    db.collection(collectionName,(err,col) => {
        if(err) {
            callback(err)
        }
        else {
            callback(null, col);
        }
    });
}
exports.getCollection = getCollection;

/**
 * Indexing for each db
 * @param {Function} callback 
 */
function ensureIndexes(callback) {
    async.parallel([
        (callback) => {
            /**
             * Indexing
             */
            getCollection('pigeonUserDetail',(err,collection) =>  {
                if(err) {
                    callback("Error in ensuring of all pigeonUserDetail");
                }
                else {
                    async.parallel( [
                            callback => {
                                collection.createIndex({"em":1},{ unique: true },callback);
                            },
                            callback => {
                                collection.createIndex({"_id":1, "devices.did":1},callback);
                            }
                        ],
                        err => {
                            callback(err);
                        }
                    );
                }
            })
        },
        (callback) => {
            /**
             * Indexing
             */
            getCollection('loginDetail',(err,collection) => {
                if(err) {
                    callback("Error in ensuring of all loginDetail");
                }
                else {
                    async.parallel( [
                            callback => {
                                collection.createIndex({"_id":1, "em":1},callback);
                            }
                        ],
                        err => {
                            callback(err);
                        }
                    );
                }
            });
        },
        (callback) => {
            /**
             * Indexing
             */
            getCollection('classDetail',(err,collection) => {
                if(err) {
                    callback("Error in ensuring of all classDetail");
                }
                else {
                    async.parallel( [
                            callback => {
                                collection.createIndex({"board":1},{ unique: true },callback);
                            }
                        ],
                        err => {
                            callback(err);
                        }
                    );
                }
            });
        },
        (callback) => {
            /**
             * Indexing
             */
            getCollection('deviceDetail',(err,collection) => {
                if(err) {
                    callback("Error in ensuring of all deviceDetail");
                }
                else {
                    async.parallel( [
                            callback => {
                                collection.createIndex({"did":1},{ unique: true },callback);
                            }
                        ],
                        err => {
                            callback(err);
                        }
                    );
                }
            });
        },
        (callback) => {
            /**
             * Indexing
             */
            getCollection('appsDetail',(err,collection) => {
                if(err) {
                    callback("Error in ensuring of all appsDetail");
                }
                else {
                    async.parallel( [
                            callback => {
                                collection.createIndex({"did":1, "appid":1},{ unique: true },callback);
                            }
                        ],
                        err => {
                            callback(err);
                        }
                    );
                }
            });
        }
    ], callback);
}