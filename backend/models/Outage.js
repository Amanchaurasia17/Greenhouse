const mongoose = require('mongoose');

const OutageSchema = new mongoose.Schema({
  location: {
    type: String,
    required: true,
  },
  description: String,
  latitude: Number,
  longitude: Number,
  timestamp: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['active', 'resolved'],
    default: 'active',
  },
});

module.exports = mongoose.model('Outage', OutageSchema);
