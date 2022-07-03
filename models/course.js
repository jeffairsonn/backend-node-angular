var mongoose = require('mongoose');
 
var courseSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    },
}, { collection:'course' }); 

module.exports = mongoose.model('course', courseSchema);