// comments-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
const mongoose = require('mongoose');
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const comments = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref : 'users' },
    event: {type: mongoose.Schema.Types.ObjectId, required: true, ref : 'events'},
    text : {type : String, required : true},
  },  {
    timestamps: true
  });

  return mongooseClient.model('comments', comments);
};
