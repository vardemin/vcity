// institutions-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
//predpriyatiya

mongoose = require('mongoose');
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const institutions = new Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    location: [{type: Number, required: true}],
    photos: [{type: mongoose.Schema.Types.ObjectId, ref: 'photos'}],
    plan: {type: mongoose.Schema.Types.ObjectId, ref: 'plans'},
    owner: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'users'},
    responsible: [{type: mongoose.Schema.Types.ObjectId, ref: 'users'}],
    reviews: [{type: mongoose.Schema.Types.ObjectId, ref: 'reviews'}],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });

  return mongooseClient.model('institutions', institutions);
};
