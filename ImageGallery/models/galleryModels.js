const mongoose = require('mongoose');

const GallerySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },   
    image: {
        type: String,
        required: true
    }
}, {
    strictQuery: true
});

const GalleryModel = mongoose.model('galleries', GallerySchema);

module.exports = GalleryModel;