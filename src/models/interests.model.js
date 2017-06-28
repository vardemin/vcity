// interests-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const interests = new Schema({
    name: { type: String, required: true },
    name_ru : String
  });

  return mongooseClient.model('interests', interests);
};
