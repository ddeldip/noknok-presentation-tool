'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Survey = mongoose.model('Survey'),
    Posts = require('./posts'),
    _ = require('lodash');


/**
 * Find survey by id
 */
exports.survey = function(req, res, next, id) {
    Survey.load(id, function(err, survey) {
        if (err) return next(err);
        if (!survey) return next(new Error('Failed to load survey ' + id));
        req.survey = survey;
        next();
    });
};

/**
 * Create a survey
 */
exports.create = function(req, res) {
    var survey = new Survey(req.body);
    survey.author = req.author;
    survey.title = req.title;
    survey.post = req.post;
    survey.value = req.value;

    survey.save(function(err) {
        if (err) {
            console.log("Error saving survey.");
        } else {
            res.jsonp(survey);
        }
    });

    Posts.update(req, res);

};

/**
 * Update a survey
 */
exports.update = function(req, res) {
    var survey = req.survey;

    survey = _.extend(survey, req.body);

    survey.save(function(err) {
        if (err) {
            console.log("Error updating survey.");
        } else {
            res.jsonp(survey);
        }
    });
};

/**
 * Delete an survey
 */
exports.destroy = function(req, res) {
    var survey = req.survey;

    survey.remove(function(err) {
        if (err) {
            console.log("Error deleting survey.");
        } else {
            res.jsonp(survey);
        }
    });
};

/**
 * Show an survey
 */
exports.show = function(req, res) {
    res.jsonp(req.survey);
};

/**
 * List of Surveys
 */
exports.all = function(req, res) {
    Survey.find().sort('-created').exec(function(err, surveys) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(surveys);
        }
    });
};