// photos-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const photos = new Schema({
    _id: Number,
    path: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
  });

  return mongooseClient.model('photos', photos);
};
