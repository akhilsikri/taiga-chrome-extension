var _ = require('lodash');
var express = require('express');
var request = require('request');
var async = require('async');
var router = express.Router();
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'Express'
    });
});
router.get('/places', function(req, res, next) {
    getPlaces(req, res);
});

function getPlaces(req, res) {
    console.log("Request to Get Places");
    var types = ['cafe', 'atm', 'bus_station', 'gym', 'night_club'],
        sLocation = '12.9395516,77.6135045',
        key = 'AIzaSyApg6qFWbNvwJkMcw2GqMieL_wVBoXnmfw',
        radius = 5000;
    async.parallel([
        function(callback) {
            var oQuery = {
                location: sLocation,
                radius: radius,
                type: types[0],
                key: key,
            };
            request({
                method: 'GET',
                uri: 'https://maps.googleapis.com/maps/api/place/radarsearch/json',
                qs: oQuery
            }, function(error, response, body) {
                console.log("Cafe Request Completed");
                var jsonData = null;
                jsonData = JSON.parse(response.body);
                setTimeout(function() {
                    callback(null, jsonData.results);
                }, 1000);
            });
        },
        function(callback) {
            var oQuery = {
                location: sLocation,
                radius: radius,
                type: types[1],
                key: key,
            };
            request({
                method: 'GET',
                uri: 'https://maps.googleapis.com/maps/api/place/radarsearch/json',
                qs: oQuery
            }, function(error, response, body) {
                console.log("ATM Request Completed");
                var jsonData = null;
                jsonData = JSON.parse(response.body);
                setTimeout(function() {
                    callback(null, jsonData.results);
                }, 800);
            });
        },
        function(callback) {
            var oQuery = {
                location: sLocation,
                radius: radius,
                type: types[2],
                key: key,
            };
            request({
                method: 'GET',
                uri: 'https://maps.googleapis.com/maps/api/place/radarsearch/json',
                qs: oQuery
            }, function(error, response, body) {
                console.log("Bus_Station Request Completed");
                var jsonData = null;
                jsonData = JSON.parse(response.body);
                setTimeout(function() {
                    callback(null, jsonData.results);
                }, 600);
            });
        },
        function(callback) {
            var oQuery = {
                location: sLocation,
                radius: radius,
                type: types[3],
                key: key,
            };
            request({
                method: 'GET',
                uri: 'https://maps.googleapis.com/maps/api/place/radarsearch/json',
                qs: oQuery
            }, function(error, response, body) {
                console.log("GYM Request Completed");
                var jsonData = null;
                jsonData = JSON.parse(response.body);
                setTimeout(function() {
                    callback(null, jsonData.results);
                }, 400);
            });
        },
        function(callback) {
            var oQuery = {
                location: sLocation,
                radius: radius,
                type: types[4],
                key: key,
            };
            request({
                method: 'GET',
                uri: 'https://maps.googleapis.com/maps/api/place/radarsearch/json',
                qs: oQuery
            }, function(error, response, body) {
                console.log("Night_Club Request Completed");
                var jsonData = null;
                jsonData = JSON.parse(response.body);
                setTimeout(function() {
                    callback(null, jsonData.results);
                }, 200);
            });
        }
    ], function(err, results) {
        console.log('Combining Results');
        var combinedJson = {
            cafe: results[0].splice(0,20),
            atm: results[1].splice(0,20),
            bus_station: results[2].splice(0,20),
            gym: results[3].splice(0,20),
            night_club: results[4].splice(0,20)
        };
        res.send(combinedJson);
    });
};
module.exports = router;