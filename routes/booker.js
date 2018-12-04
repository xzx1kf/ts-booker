
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

router.post('/countDocs', function(req, res, next) {

	/* Request from client to count the number of documents in a 
	collection; the request should be of the form:

	{
		MongoDBURI: string; // Connect string for MongoDB instance
		collectionName: string;
	}

	The response will contain:

	{
		success: boolean;	
		count: number;		// The number of documents in the collection
		error: string;
	}
	*/

	var requestBody = req.body;
	var database = new DB;

	database.connect(requestBody.MongoDBURI)
	.then(
		function() {
			return database.countDocuments(requestBody.collectionName)
		})
	.then(
		function(count) {
			return {
					"success": true,
					"count": count,
					"error": ""
				};
		},
		function(err) {
			console.log("Failed to count the documents: " + err);
			return {
					"success": false,
					"count": 0,
					"error": "Failed to count the documents: " + err
				};
		})
	.then(
		function(resultObject) {
			database.close();
			res.json(resultObject);
		})
})

router.post('/getBookings', function(req, res, next) {

  /* Request from client to get the documents for a specified day from a collection.
   * The request should be of the form:
   *
   * {
   *   MongoDBURI: string; // Connect string for MongoDB instance
   *   collectionName: string
   *   matchPattern: Object; // Filter to determine which documents should be 
   *                         // returned.
   * }
   *
   * The response will contain:
   *
   * {
   *   success: boolean;
   *   documents: string;
   *   error: string;
   * }
   */

  var requestBody = req.body;
  var database = new DB;

  database.connect(requestBody.MongoDBURI)
  .then(
      function() {
        return database.getBookings(
            requestBody.collectionName,
            requestBody.date)
      })
  .then(
      function(docs) {
        return {
          "success": true,
          "documents": docs,
          "error": ""
        };
      },
      function(error) {
        console.log('Failed to retrieve booking data: ' + error);
        return {
          "success": false,
          "documents": null,
          "error": "Failed to retrieve booking data: " + error
        };
      })
  .then(
      function(resultObject) {
        database.close();
        res.json(resultObject);
      }
  )
})

router.get('/bookings', function(req, res, next) {

  var database = new DB;

  database.connect(config.client.mongodb.defaultUri + 
      "/" + config.client.mongodb.defaultDatabase + 
      "?authSource=admin&socketTimeoutMS=30000&maxPoolSize=20")
  .then(
      function() {
        return database.getBookings(
            config.client.mongodb.defaultCollection,
            "2018-12-01")
      })
  .then(
      function(TimeSlots) {
        return {
          TimeSlots
        };
      },
      function(error) {
        console.log('Failed to retrieve booking data: ' + error);
        return {
          "success": false,
          "documents": null,
          "error": "Failed to retrieve booking data: " + error
        };
      })
  .then(
      function(resultObject) {
        database.close();
        res.json(resultObject.TimeSlots);
      }
  )
})

module.exports = router;
