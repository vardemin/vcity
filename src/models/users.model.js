// users-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

const mongoose = require('mongoose');
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const users = new mongooseClient.Schema({
    email: {type: String, unique: true},
    password: { type: String, required: true },
    name: {type: String, required: true},
    birth: {type: Date, default:Date.UTC(1999,1,1), required: true},
    sex: {type: Boolean, requred: true},
    interests: [{type: mongoose.Schema.Types.ObjectId, ref: 'interests'}],
    avatar: {type: mongoose.Schema.Types.ObjectId, ref: 'photos'},
    roles: [{type: String}],
    location: {type:[Number], index: '2d'},
  },  {
    timestamps: true
  });

  return mongooseClient.model('users', users);
};
