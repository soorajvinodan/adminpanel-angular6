/**
 * Pigeon config.js file to access fields from config.json.
 * Created by : Shrabanee
 * Date : 28/09/2018
 */
"use strict";
var config_json = null;
var arg = process.argv, configIndex = arg.indexOf('--config');
if(configIndex >= 0) {
	var path = arg[configIndex+1];
}
if(path) {
	config_json = require(path+'config.json');
}
else config_json = require('./config.json');

function config() {
    this.port = config_json.port;
    this.env = config_json.env;
    this.devUrlOrigin = config_json.devUrlOrigin;
    this.devBuildOrigin = config_json.devBuildOrigin;
}
config.prototype.getSecret = () => {
    return config_json.keySec;
}
config.prototype.getPwdSecret = () => {
    return config_json.pwdSec;
}

config.prototype.connectDatabase = function()
{
	var dbConf = config_json.dbConf;
	this.classDbUrl = dbConf.classDbUrl;
    this.pigeonUsrDbUrl = dbConf.pigeonUsrDbUrl;
    this.deviceDbUrl = dbConf.deviceDbUrl;
    this.appsDbUrl = dbConf.appsDbUrl;

    return this;
}

exports.config = new config();