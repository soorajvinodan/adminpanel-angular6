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
}
module.exports = new deviceProvider();
