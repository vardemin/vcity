// event-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

const mongoose = require('mongoose');
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const event = new Schema({
    name: {type: String, required: true},
    userId: {type: mongoose.Schema.Types.ObjectId, required: true, ref:'users'},
    occuredAt: {type : Date ,required: true},
    description:{type: String, required: true},
    photos:[{type: mongoose.Schema.Types.ObjectId, ref : 'photos'}],
    location:{type: [Number]  , required :true, index: '2d'},
    radius : {type: Number , default :1},
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });

  return mongooseClient.model('events', event);
};
