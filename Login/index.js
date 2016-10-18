const mongoose = require('mongoose');

const LoginSchema = new mongoose.Schema({
	name: String,
	password: String
});

module.exports = mongoose.model('Login', LoginSchema);