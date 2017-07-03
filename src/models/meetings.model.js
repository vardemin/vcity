// meetings-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const meetings = new Schema({
    _id: Number,
    name: {type: String, required: true},
    description: {type: String, required: true},
    location: [{type: Number, required: true}],
    radius: {type: Number, required: true},
    priority: {type: Number, required: true},
    institution: {type: Number, ref:'institutions'},
    when: {type: Date, required: true},
    end: {type: Date, required: true},
    interests: [{type: Number, ref:'insterests'}],
    createdAt: { type: Date, default: Date.now },
  });

  return mongooseClient.model('meetings', meetings);
};
