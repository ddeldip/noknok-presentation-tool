'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Post = mongoose.model('Post'),
    Survey = require('../models/survey');
    _ = require('lodash');


/**
 * Find post by id
 */
exports.post = function(req, res, next, id) {
    Post.load(id, function(err, post) {
        if (err) return next(err);
        if (!post) return next(new Error('Failed to load post ' + id));
        req.post = post;
        next();
    });
};

/**
 * Create a post
 */
exports.create = function(req, res) {
    var post = new Post(req.body);
    post.author = req.author;
    post.content = req.content;
    post.tags = req.tags;
    post.survey = req.survey;

    var survey = new Survey(req.body.survey);
    survey.save(function(err){
        if (err) {
            console.log("Error saving survey.");
        } else {
            post.save(function(err) {
                if (err) {
                    console.log("Error saving post.");
                } else {
                    res.jsonp(post);
                }
            });
        }
    });

};

/**
 * Update a post
 */
exports.update = function(req, res) {
    var post = req.post;

    post = _.extend(post, req.body);

    post.save(function(err) {
        if (err) {
            console.log("Error updating post.");
        } else {
            res.jsonp(post);
        }
    });
};

/**
 * Delete an post
 */
exports.destroy = function(req, res) {
    var post = req.post;

    post.remove(function(err) {
        if (err) {
            console.log("Error deleting post.");
        } else {
            res.jsonp(post);
        }
    });
};

/**
 * Show an post
 */
exports.show = function(req, res) {
    res.jsonp(req.post);
};

/**
 * List of Posts
 */
exports.all = function(req, res) {
    Post.find().sort('-created').populate('comments survey').exec(function(err, posts) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(posts);
        }
    });
};