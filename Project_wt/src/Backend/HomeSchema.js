const mongoose = require('mongoose');

const product = mongoose.Schema({
    image1: String,
    image2: String,
    image3: String,
    id: Number,
    price : Number,
    quantity : Number,
    name : String,
    Detail: Array,
    Ingredients: String,
    Information : Array,
    Instruction : Array,
    date : String,
    SearchArray : Array
});

module.exports = mongoose.model('project', product);