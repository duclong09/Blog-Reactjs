const mongoose = require('mongoose');
const locationSchema = new mongoose.Schema({
    type: {
        type: String,
        default: 'Point',
        enum: ['Point']
    },
    coordinates: ['Number'],
    description: String
});
const Location = mongoose.model('Location', locationSchema);
module.exports = Location;