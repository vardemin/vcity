// messages-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
const mongoose = require('mongoose');
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const messages = new Schema({
    from: {type: mongoose.Schema.Types.ObjectId, required: true, ref : 'users' },
    to: {type: mongoose.Schema.Types.ObjectId, required: true, ref : 'users' },
    text: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  });

  return mongooseClient.model('messages', messages);
};
