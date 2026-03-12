const mongoose = require('mongoose')
const schema = new mongoose.Schema({
    name: String,
    email: String,
    age: String
});
module.exports = mongoose.model('sample',schema)