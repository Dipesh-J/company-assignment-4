const mongoose = require('mongoose')

const questionSchema = new mongoose.Schema({
    question:String,
    solution:String,
    multimedia:String
})
module.exports = mongoose.model('questions',questionSchema)