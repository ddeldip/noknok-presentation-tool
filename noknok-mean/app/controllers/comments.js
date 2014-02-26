'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Comment = mongoose.model('Comment'),
    Posts = require('./posts'),
    _ = require('lodash');


/**
 * Find comment by id
 */
exports.comment = function(req, res, next, id) {
    Comment.load(id, function(err, comment) {
        if (err) return next(err);
        if (!comment) return next(new Error('Failed to load comment ' + id));
        req.comment = comment;
        next();
    });
};

/**
 * Create a comment
 */
exports.create = function(req, res) {
    var comment = new Comment(req.body);
    comment.author = req.author;
    comment.content = req.content;
    comment.post = req.post;

    comment.save(function(err) {
        if (err) {
            console.log("Error saving comment.");
        } else {
            res.jsonp(comment);
        }
    });

    Posts.update(req, res);

};

/**
 * Update a comment
 */
exports.update = function(req, res) {
    var comment = req.comment;

    comment = _.extend(comment, req.body);

    comment.save(function(err) {
        if (err) {
            console.log("Error updating comment.");
        } else {
            res.jsonp(comment);
        }
    });
};

/**
 * Delete an comment
 */
exports.destroy = function(req, res) {
    var comment = req.comment;

    comment.remove(function(err) {
        if (err) {
            console.log("Error deleting comment.");
        } else {
            res.jsonp(comment);
        }
    });
};

/**
 * Show an comment
 */
exports.show = function(req, res) {
    res.jsonp(req.comment);
};

/**
 * List of Comments
 */
exports.all = function(req, res) {
    Comment.find().sort('-created').exec(function(err, comments) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(comments);
        }
    });
};