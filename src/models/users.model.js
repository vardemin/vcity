// users-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const users = new mongooseClient.Schema({

    email: {type: String, unique: true},
    password: { type: String },
    name: {type: String, required: true},
    age: {type: Number, required: true},
    sex: {type: Boolean, requred: true},
    interests: [{type: Number, ref: 'interests'}],
    avatar: {type: Number, ref: 'photos'},
    roles: [{type: String, required:true }],
    location: [Number],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });

  return mongooseClient.model('users', users);
};
