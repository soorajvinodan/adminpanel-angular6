/**
 * All the functions related to customer db are in this file.
 * Created by : Shrabanee
 * Date : 28/09/2018
 */
"use strict";

const customerProvider = require('./providers/customerProvider');
const loginProvider = require('./providers/loginProvider');
const passport = require('passport');
const async = require('async');
const Strategy = require('passport-local').Strategy,
      SHA256 = require('crypto-js/sha256');
let validator = require('validator');
const customerValidator = require('./customerRequestValidator');

passport.serializeUser(function(user, done)
{
	done(null, user);
});

passport.deserializeUser(function(obj, done)
{
	done(null, obj);
});
/**
 * 
 */
passport.use(new Strategy({
    usernameField: 'username'
  },(userEmail,password, done) => {
    customerProvider.getCustomerByEmail(userEmail, (err, results) => {
        if(err) {
            return done(null, false, {status:'fail',errMsg:error.msg});
        }
        else {
            if(results.length==1) {
                /**
				 * Retrieve the password from the results.
				 */
				var pass=results[0].hpwd,
					salt = results[0].salt;
                var passwordSalt = password+salt;
                var passwordHash = SHA256(passwordSalt);
				passwordHash = passwordHash.toString();
				/**
				 * If the password match with the password provided by the user then return the username and id to callback.
				 */
				if(passwordHash === pass) {
                    console.log("==matched password==");
                    done(null, results[0]);
                }
                else done(null, false,{errMsg:'@invalidPassword'});
            }
            else {
                return done(null, false,{errMsg:'@invalidLoginAttempt'});
            }
        }
    })
}))
/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @param {*} callback 
 */
function passportLocalStrategy(req, res, next, callback) {
	/**
	 * Calling the authentication method of passport using local strategy. Returns user with required field
	 */
	passport.authenticate('local',{session:false}, (err, user, info) => {
        // If Passport throws/catches an error
        if (err) {
            res.status(404).json(err);
            return;
        }

        /**
		 * Else check for the user.
		 */
		if(!user) {
			/**
			 * If there is no user with this email and password return the info data.
			 */
			return res.json(info);
		}
		/**
		 * Else call the logIn function of the req object.
		 */
		req.logIn(user,{ session: false }, function(err)
		{
			/**
			 * If err call the next function with error.
			 */
			if(err)
			{
				return next(err);
			}
			var reqObject = {
				ua :req.headers['user-agent'],
				rip : req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress
			};
			callback(null, user, reqObject);
		});
	})(req,res,next);
}

/**
 * Function to be called on login.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @param {*} callback 
 */
exports.authenticate = (req,res,next,callback) => {
    let email = req.body.username,
    password = req.body.password;
    if(email) {
        email=email.toLowerCase();
    }
    async.waterfall([
        callback => {
            /**
             * Check whether the username is in valid email format.
             */
            let valid=validator.isEmail(email);
            if(email && valid && password) {
                passportLocalStrategy(req, res, next, function(err, user, obj) {
                    callback(err, user, obj);
                });
            }
            else callback({msg : '@invalEmail'});
        },
        /**
         * Check any other active record is there in login detail for the same em.
         */
        (authData, user, callback) => {
            loginProvider.getActiveRecordByEmail(email, (err, result) => {
                callback(err, authData, user, result);
            });
        },
        /**
         * If present, update active flag to false for that record.
         */
        (authData, user, result, callback) => {
            if(result && result.length) {
                loginProvider.updateByQuery(email, {active : false}, (err) => {
                    callback(err, authData, user);
                });
            }
            else {
                callback(null, authData, user);
            }
        },
        /**
         * Create a new record in login detail as active true and send the _id back to client.
         */
        (authData, user, callback) => {
            loginProvider.save({em : email}, (err, result) => {
                if(err) {
                    callback(err);
                }
                else {
                    let returnObj = {};
                    returnObj.una = authData.una;
                    returnObj.instnm = authData.instnm;
                    callback(null, [returnObj], user, result[0]);
                }
            });
        }
    ], callback);
}

/**
 * 
 * @param {*} id 
 * @param {*} callback 
 */
exports.getLoginRecordById = (id, callback) => {
    loginProvider.getActiveRecordById(id, (err, result) => {
        if(err) {
            callback(err);
        }
        else if(result && result.length) {
            callback(null, result[0]);
        }
        else callback({msg : "@notActive"});
    })
}

/**
 * Function to call save function of customerProvider
 * @param {*} options 
 * @param {*} callback 
 */
exports.createNewCustomer = (options, callback) => {
    customerProvider.save(options, (err, result) => {
        callback(err, result);
    })
}

/**
 * Function to call getCustomerByEmail function of customerProvider
 * @param {*} options 
 * @param {*} callback 
 */
exports.findCustomer = (options, callback) => {
    customerProvider.getCustomerByEmail(options.em, (err, result) => {
        callback(err, result);
    })
}

/**
 * 
 * @param {*} options
 * @param {*} callback
 */
exports.addDevice = (options, callback) => {
    async.waterfall([
        callback => {
            //validation and sanitization
            customerValidator.validateAddDevice(options, (errMsg, valid) => {
                if(errMsg) callback({msg : errMsg});
                else {
                    callback(null);
                }
            });
        },
        callback => {
            customerProvider.addDeviceByUid(options, (err) => {
                if(err) {
                    console.log("addDeviceByUid err: ");
                    console.log(err);
                }
                callback(err);
            });
        }
    ], callback)
}

exports.getDevices = (uid, callback) => {
    async.waterfall([
        callback => {
            //validation and sanitization
            customerValidator.validateMongoId(uid, (errMsg, valid) => {
                if(errMsg) callback({msg : errMsg});
                else {
                    callback(null);
                }
            });
        },
        callback => {
            customerProvider.getDevicesByUid(uid, (err, result) => {
                if(err) {
                    console.log("getDevices err: ");
                    console.log(err);
                }
                callback(err, result);
            })
        }
    ], callback)
}