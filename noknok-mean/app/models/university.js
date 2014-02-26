'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/**
 * University Schema
 */
var UniversitySchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    name: {
        type: String,
        default: '',
        trim: true
    },
    geo: {
        type: [Number],
        index: '2d'
    },
    students: [{
        type: Schema.ObjectId,
        ref: 'User'
    }],
    posts: [{
        type: Schema.ObjectId,
        ref: 'Post'
    }]

});

/**
 * Validations
 */
UniversitySchema.path('title').validate(function(title) {
    return title.length;
}, 'Title cannot be blank');

/**
 * Statics
 */
UniversitySchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).populate('user', 'name username').exec(cb);
};

UniversitySchema.methods.findNear = function(cb) {
    return this.model('Place').find({geo: { $nearSphere: this.geo, $maxDistance: 0.01} }, cb);
}

mongoose.model('University', UniversitySchema);
