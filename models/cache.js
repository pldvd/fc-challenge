const mongoose, { Schema } = require('mongoose');

const cacheSchema = new Schema({
  key: {
    type: String,
    required: true
  },
  data: {
    type: String,
    required: true
  },
  ttl: {
    type: Number,
    default: 86400 // 24 hours
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  updatedAt: {
    type: Date,
    default: Date.now()
  }
},
  { collection: 'cache' }
);

module.exports = mongoose.model('Cache', cacheSchema);