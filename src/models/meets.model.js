// meets-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
const mongoose = require('mongoose');
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const meets = new Schema({
    author: { type: mongoose.Schema.Types.ObjectId, required: true, ref : 'users' },
    text: { type: String, required: true },
    hidden: { type: String, required: true},
    wishing: [{type: mongoose.Schema.Types.ObjectId, ref : 'users' }],
    confirmed: [{type: mongoose.Schema.Types.ObjectId, ref : 'users' }],
    location:{type: [Number]  , required :true, index: '2d'},
  }, {
    timestamps: true
  });

  return mongooseClient.model('meets', meets);
};
