// meetings-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

const mongoose = require('mongoose');
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const meetings = new Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    location: [{type: Number, required: true}],
    radius: {type: Number, required: true},
    priority: {type: Number, required: true},
    institution: {type: mongoose.Schema.Types.ObjectId, ref:'institutions'},
    when: {type: Date, required: true},
    end: {type: Date, required: true},
    interests: [{type: mongoose.Schema.Types.ObjectId, ref:'insterests'}],
  },  {
    timestamps: true
  });

  return mongooseClient.model('meetings', meetings);
};
