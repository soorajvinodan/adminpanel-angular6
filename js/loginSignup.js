/**
 * Pigeon signup and login.
 * Created by : Shrabanee
 * Date : 28/09/2018
 */
"use strict";

let customerJs = require('./customer');
const loginProvider = require('./providers/loginProvider');
let validatorJs = require('./loginRegisterValidator');
let async = require('async'), CryptoJS = require('crypto-js');
let config = require('../config').config;
let secret = config.getSecret();
const crypto=require('crypto'),
    SHA256 = require('crypto-js/sha256'),
    request = require('request');
/**
 * 
 * @param {*} len 
 */
function generateId(len) 
{
  /**
  * Generating unique id by randomBytes.
  */
  let id = crypto.randomBytes(Math.ceil(len * 3 / 4))
    .toString('base64')
    .slice(0, len)
    .replace(/\//g, '-')
    .replace(/\+/g, '_');
  /**
  * Signing the id using the secret value.
  */
  //let sign = signId(id,pwdSec);
  
  /**
  * Returning the signed value.
  */
  return id;
};

/**
* Function for signing the id.
*/
function signId(val, secret)
{
  let hmacTxt = crypto.createHmac('sha256', secret).update(val).digest('base64');
  let cnxHmac = hmacTxt.replace(/=+$/, '').replace(/\+/g, config.getPwdSecret());
  cnxHmac = cnxHmac.replace(/\//g, 'ktd');
  return val + '.' + cnxHmac;
    
}
/**
 * 
 * @param {Object} options 
 * @param {function} callback 
 */
exports.checkAndRegister = (options, callback) => {
    let instnm = options.instnm;
    async.waterfall([
        callback => {
            validatorJs.validateUserData(options, (errMsg, valid) => {
                if(errMsg && !valid) {
                    callback({msg : errMsg})
                }
                else {
                    callback(null);
                }
            })
        },
        callback => {
            customerJs.findCustomer(options, function(err, result) {
                if(!err) {
                    if(result && result.length) {
                        return callback({msg : '@sameEm'},result);
                    }
                    else {
                        callback(null);
                    }
                }
                else callback(err);
            });
        },
        callback => {
            options.instnm = instnm;
            
            let pwd = options.pwd;
            let salt = generateId(25);
            let passwordSalt = pwd+salt;
            
            let passwordHash = SHA256(passwordSalt);
                passwordHash = passwordHash.toString();
            
                options.hpwd = passwordHash;
                options.salt = salt;
                
            customerJs.createNewCustomer(options, (err, record) => {
                callback(err, record);
            })
        },
        /**
         * Check for active record in loginDetail for the email.
         */
        (record, callback) => {
            loginProvider.getActiveRecordByEmail(options.em, (err, result) => {
                if(err) callback(err);
                else if(result && result.length) {
                    callback({msg : "@alreadyActiveSession"});
                }
                else {
                    callback(null, record);
                }
            });
        },
        (record, callback) => { 
            loginProvider.save({em : options.em}, (err, result) => {
                if(err) {
                    callback(err);
                }
                else {
                    callback(null, record, result[0]);
                }
            });
        }
    ], callback);
}