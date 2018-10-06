
/**
 * All the functions related to customer db request validation.
 * Created by : Shrabanee
 * Date : 28/09/2018
 */
"use strict";

const string = require('string');

/**
 * Requiring validator object to validate the format of inputs sent from client.
 */
let validator = require("validator");

/**
 * 
 * @param {*} options 
 * @param {*} callback 
 */
exports.validateAddDevice = (options, callback) => {
    let valid = true;
    let errMsg = null;
    if(!options.hasOwnProperty('did') || !options.did 
    || !options.hasOwnProperty('dname') || !options.dname
    || !options.hasOwnProperty('uid') || !options.uid
    || !options.hasOwnProperty('category') || !options.category) {
        valid = false;
        errMsg = '@missingVar';
        console.log(JSON.stringify(options));
        return callback(errMsg,valid);
    }
    else if(options.hasOwnProperty('uid') && !validator.isMongoId(options.uid)) {
        valid = false;
        errMsg = '@invalUid';
        console.log(JSON.stringify(options));
        return callback(errMsg,valid);
    }
    else if(options.hasOwnProperty('category') && options.category){
        let validCategories = ["pre primary","primary","secondary", "senior secondary"];
        if(validCategories.indexOf(options.category.toLowerCase()) < 0) {
            valid = false;
            errMsg = '@invalCategory';
            console.log(JSON.stringify(options));
            return callback(errMsg,valid);
        }
    }
    if(valid) {
        options.email = string(options.dname.trim()).stripTags().s;
        options.did = string(options.did.toString().trim()).stripTags().s;

        return callback(errMsg,valid);
    }
}

/**
 * 
 * @param {*} uid 
 * @param {*} callback 
 */
exports.validateMongoId = (uid, callback) => {
    let valid = true;
    let errMsg = null;
    if(!uid) {
        valid = false;
        errMsg = '@missingUid';
        console.log(JSON.stringify(uid));
        return callback(errMsg,valid);
    }
    else if(uid && !validator.isMongoId(uid)) {
        valid = false;
        errMsg = '@invalUid';
        console.log(JSON.stringify(uid));
        return callback(errMsg,valid);
    }
    if(valid) {
        return callback(errMsg,valid);
    }
}