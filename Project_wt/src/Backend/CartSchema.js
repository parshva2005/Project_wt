const mongoose = require('mongoose');

const cart = mongoose.Schema({
    CartProduct : Array,
    OrderProduct : Array,
    date : Date
});

module.exports = mongoose.model('cart', cart);