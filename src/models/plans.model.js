// plans-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
//posti dlya kompaniy
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const plans = new Schema({
    _id: Number,
    name: {type: String, required: true},
    priority: {type: Number, required: true},

  });

  return mongooseClient.model('plans', plans);
};
