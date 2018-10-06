/**
 * All the functions related to classDb are in this file.
 * Created by : Shrabanee
 * Date : 28/09/2018
 */
"use strict";

var dbProvider = require('./provider.js');

var ObjectID = require('mongodb').ObjectID;

class classProvider {
    constructor() {
    }
    getCollection(callback) {
        dbProvider.getCollection('classDetail', (error, collection) => {
            /**
             * If no collection
             */
            if( error ) {
                callback({msg:'@mColl'});
            }
            /**
             * If collection
             */
            else {
                callback(null, collection);
            }
        });
    };
    getClassesAndUnits(boardName, callback) {
        this.getCollection((err, collection) => {
            if(err) {
                console.log("Error in get collection getClassesAndUnits: " + err);
                callback(err);
            }
            else {
                collection.find({board : boardName}).toArray((err, result) => {
                    if(err) {
                        console.log("Error in find getClassesAndUnits: " + err);
                        callback(err);
                    }
                    else if(result && result.length) {
                        callback(null, result);
                    }
                    else callback(null);
                });
            }
        })
    }
}
module.exports = new classProvider();
