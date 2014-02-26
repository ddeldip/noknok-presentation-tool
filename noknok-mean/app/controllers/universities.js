'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    University = mongoose.model('university'),
    _ = require('lodash');


/**
 * Find university by id
 */
exports.university = function(req, res, next, id) {
    University.load(id, function(err, university) {
        if (err) return next(err);
        if (!university) return next(new Error('Failed to load university ' + id));
        req.university = university;
        next();
    });
};

/**
 * Create a university
 */
exports.create = function(req, res) {
    var university = new University(req.body);
    university.name = req.author;
    university.geo = req.geo;

    var university = new University(req.body.university);

    university.save(function(err) {
        if (err) {
            console.log("Error saving university.");
        } else {
            res.jsonp(university);
        }
     });

};

/**
 * Update a university
 */
exports.update = function(req, res) {
    var university = req.university;

    university = _.extend(university, req.body);

    university.save(function(err) {
        if (err) {
            console.log("Error updating university.");
        } else {
            res.jsonp(university);
        }
    });
};

/**
 * Delete an university
 */
exports.destroy = function(req, res) {
    var university = req.university;

    university.remove(function(err) {
        if (err) {
            console.log("Error deleting university.");
        } else {
            res.jsonp(university);
        }
    });
};

/**
 * Show an University
 */
exports.show = function(req, res) {
    res.jsonp(req.university);
};

/**
 * List of all Universities
 */
exports.all = function(req, res) {
    University.find().sort('-created').exec(function(err, universities) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(universities);
        }
    });
};

/**
 * List of all Universities
 */
exports.all = function(req, res) {
    University.find().sort('-created').exec(function(err, universities) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(universities);
        }
    });
};