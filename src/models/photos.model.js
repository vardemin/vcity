// photos-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
const mongoose = require('mongoose');
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const photos = new Schema({
    _id: { type: String, unique:true, required:true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'users'},
    createdAt: { type: Date, default: Date.now }
  });

  return mongooseClient.model('photos', photos);
};
