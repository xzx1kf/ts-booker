
/*
Defines and implements the Mongopop Restful API by adding 'get' and 'post'
routes to the router.
*/

var getIP = require('external-ip')();
var request = require("request");
var express = require('express');
var router 	= express.Router();

var config = require('../config.js');
var DB = require('../javascripts/db');

var publicIP; // IP address of the server running the Mongopop service

getIP(function (err, ip) {

	// Stores the IP address of the server where the Mongopop service is running

    if (err) {
    	console.log("Failed to retrieve IP address: " + err.message);
        throw err;
    }
    console.log("ts-booker API running on " + ip + ":" + config.expressPort);
    publicIP = ip;
});

router.get('/', function(req, res, next) {

	// This isn't part of API and is just used from a browser or curl to test that
	// "/pop" is being routed correctly.

	var testObject = {
		"AppName": "ts-booker",
		"Version": 1.0
	}
	res.json(testObject);
});

router.get('/ip', function(req, res, next) {

  // Sends a response with the IP address of the server running this service.

  res.json({
    "ip": publicIP
  });
});

router.get('/config', function(req, res, next) {
  res.json(config.client);
});

module.exports = router;
