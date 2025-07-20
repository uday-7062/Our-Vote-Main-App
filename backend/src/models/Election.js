const mongoose = require('mongoose');

const ElectionSchema = new mongoose.Schema({
  name: String,
  location: {
    type: { type: String, default: 'Point' },
    coordinates: [Number], // [longitude, latitude]
  },
  date: Date,
  description: String,
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

ElectionSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Election', ElectionSchema); 