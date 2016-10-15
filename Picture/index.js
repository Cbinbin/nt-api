const mongoose = require('mongoose');

const PictureSchema = new mongoose.Schema({
	url: String
});

module.exports = mongoose.model('Picture',PictureSchema);