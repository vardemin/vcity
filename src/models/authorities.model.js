// authorities-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const authorities = new Schema({
    name: { type: String, required: true, unique: true},
    rank: {type: Number, required: true, unique:true}
  });

  return mongooseClient.model('authorities', authorities);
};
