var mongoose = require('mongoose');

module.exports = mongoose.model('fruit', {
    name: {
      type: String,
      required: true
    },
    cost: {
      type: Number,
      required: true
    },
    quantity: {
      type: Number,
      required: true
    }
});
