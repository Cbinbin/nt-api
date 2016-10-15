const mongoose = require('mongoose');

const RequiremSchema =  new mongoose.Schema({
	projectTypes: String,
	projectBudget: String,
	projectCycles: String,
	project: String,
	names: String,
	cellphoneNumber: Number,
	describe: String,
	meta: {
		createAt: {
			type: Date,
			default: Date.now()
		}
	}
});

module.exports = mongoose.model('Requirem', RequiremSchema);
