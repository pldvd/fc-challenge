const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
    default: Date.now() + 86400 // 24 hours from creation
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