'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/**
 * Survey Schema
 */
var SurveySchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    title: {
        type: String
    },
    value: {
        type: Number
    },
    author: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    post: {
        type: Schema.ObjectId,
        ref: 'Post'
    }
});

/**
 * Validations
 */
SurveySchema.path('title').validate(function(title) {
    return title.length;
}, 'Title cannot be blank');

/**
 * Statics
 */
SurveySchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).populate('user', 'name username').exec(cb);
};

mongoose.model('Survey', SurveySchema);
