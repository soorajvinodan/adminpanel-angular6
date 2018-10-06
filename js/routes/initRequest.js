/**
 * Pigeon init request.
 * Created by : Shrabanee
 * Date : 28/09/2018
 */
"use strict";
let classProvider = require('../providers/classProvider');;

exports.getClassAndUnits = (req, res) => {
    var boardName = req.params.boardName;
    if(boardName) {
        classProvider.getClassesAndUnits(boardName , (err, result) => {
            if(err) {
                res.json({status:'fail',errMsg : err});
            }
            else if(result && result.length) {
                res.json({status:'Ok',result:result});
            }
            else res.json({status:'fail',err: {msg : '@noResult'}});
        })
    }
    else {
        res.json({status:'fail',err: {msg : '@noBoard'}});
    }
}
exports.getInfoOfUnit = (req, res) => {
    var searchTerm = req.body.st;
    let stVal = req.body.stVal;
    if(searchTerm && stVal) {
        res.json({status:'Ok'});
    }
    else {
        res.json({status:'fail',result:'@noSearchTerm'});
    }
}