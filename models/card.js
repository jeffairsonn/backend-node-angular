var mongoose = require('mongoose');
 
var cardSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        required: true
    },
    course_id: {
        type: String,
        required: true
    },
}, { collection:'card' }); 

module.exports = mongoose.model('card', cardSchema);