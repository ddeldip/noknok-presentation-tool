'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/**
 * Post Schema
 */
var PostSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    content: {
        type: String,
        default: '',
        trim: true
    },
    tags: [{
        type: String
    }],
    comments: [{
        type: Schema.ObjectId,
        ref: 'Comment'
    }],
    likedBy: [{
        type: Schema.ObjectId,
        ref: 'User'
    }],
    survey: {
        type: Schema.ObjectId,
        ref: 'Survey'
    },
    author: {
        type: Schema.ObjectId,
        ref: 'User'
    }
});

/**
 * Statics
 */
PostSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).populate('user', 'name username').exec(cb);
};

mongoose.model('Post', PostSchema);
