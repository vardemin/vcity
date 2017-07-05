// review-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
//obzor komponiy
mongoose = require('mongoose');
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const review = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref:'users', required: true },
    text: { type: String, required: true },
    mark: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });

  return mongooseClient.model('reviews', review);
};
