var mongoose = require('mongoose');
 
var imageSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true
    },
}, { collection:'image' }); 

module.exports = mongoose.model('image', imageSchema);