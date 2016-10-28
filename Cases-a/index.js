const mongoose = require('mongoose');

const CaseSchema = new mongoose.Schema({
	title: String,
	money: String,
	quota: String,
	cycle: String,
	days: String,
	types: String,
	differences: String,
	photoUrl: String,
	pics: Array,
	description: String,
	accomplish: Boolean
});

module.exports = mongoose.model('Case', CaseSchema);