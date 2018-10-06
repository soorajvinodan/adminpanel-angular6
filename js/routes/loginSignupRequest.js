/**
 * Pigeon login and sign up request.
 * Created by : Shrabanee
 * Date : 28/09/2018
 */
"use strict";
let registerOrLoginJs = require('../loginSignup');
let customerJs = require('../customer');

exports.checkLogin = (req, res, next) => {
    let reqCookies = req.cookies;
    /**
     * If pgn_ses_id is present in request cookies, check it is an active id or not.
     * If active send ok response to redirect to class page.
     * Else show registartion page. Send fail response.
     */
    if(reqCookies && reqCookies['pgn_ses_id']) {
        customerJs.getLoginRecordById(reqCookies['pgn_ses_id'], (err, record) => {
            if(err) res.json({status:"fail", msg : err.msg});
            else res.json({status:"ok", una : reqCookies['pgn_una'],instnm:reqCookies['pgn_instnm'], uEm : record.em});
        })
    }
    else {
        res.json({status:"fail", msg : "@noCnxCookie"});
    }
}
/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.login = (req, res, next) => {
    let email = req.body.username;
    let password = req.body.password;
    if(email && password) {
        customerJs.authenticate(req,res,next,function(err,authdata,user,loginRecord) {
            if(err){
                return res.json({status:"fail",errMsg:err.msg});
            }
            else {
                //2 years validity for cookie
                let expireDt = 365 * 2 * 24 * 3600 * 1000;
                res.cookie('pgn_ses_id',loginRecord._id.toString(),{'maxAge' : expireDt});
                res.cookie('pgn_una',authdata[0].una.toString(),{'maxAge' : expireDt});
                res.cookie('pgn_instnm',authdata[0].instnm.toString(),{'maxAge' : expireDt});
                return res.json({status:"ok", result : authdata});
            }
        });
    }
    else {
        res.json({status:'fail',msg : '@notValidParams'});
    }
}
/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.register = (req, res) => {
    var email = req.body.em;
    var instnm = req.body.instnm;
    var name = req.body.name;
    var pwd = req.body.pwd;
    if(email && instnm && name) {
        registerOrLoginJs.checkAndRegister({em : email, instnm : instnm, name : name, pwd:pwd, type : "admin"},(err, result, loginRecord) => {
            if(err) {
                res.json({status:'fail',errMsg : err});
            }
            else if(result && result.length) {
                //2 years validity for cookie
                let expireDt = 365 * 2 * 24 * 3600 * 1000;
                res.cookie('pgn_ses_id',loginRecord._id.toString(),{'path' : '/', 'maxAge' : expireDt});
                res.cookie('pgn_una',name.toString(),{'path' : '/', 'maxAge' : expireDt});
                res.cookie('pgn_instnm',authdata[0].instnm.toString(),{'maxAge' : expireDt});
                
                res.json({status:'Ok',result:result});
            }
            else res.json({status:'fail',errMsg: '@noResult'});
        });
    }
    else res.json({status:'fail',errMsg: '@invalidParams'});
}