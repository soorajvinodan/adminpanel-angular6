
/**
 * All the functions related to login or register request validation.
 * Created by : Shrabanee
 * Date : 28/09/2018
 */
"use strict";

var string = require('string');

/**
 * Requiring validator object to validate the format of inputs sent from client.
 */
let validator = require("validator");

exports.validateUserData = (options, callback) => {
    var valid = true;
    var errMsg = null;
    if(!options.hasOwnProperty('em') || !options.em || !options.hasOwnProperty('instnm') || !options.instnm 
    || !options.hasOwnProperty('name') || !options.name)  {
        valid = false;
        errMsg = '@missingVar';
        return callback(errMsg,valid);
    }
    else if(options.hasOwnProperty('em') && !validator.isEmail(options.em)) {
        valid = false;
        errMsg = '@invalEmail';
        return callback(errMsg,valid);
    }
    if(valid) {
        options.em = string(options.em.trim()).stripTags().s;
        options.em = options.em.toLowerCase();
        options.name = string(options.name.trim()).stripTags().s;
        options.instnm = string(options.instnm.trim()).stripTags().s;
        return callback(errMsg,valid);
    }
}