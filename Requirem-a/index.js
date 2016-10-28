const mongoose = require('mongoose');

const RequiremSchema =  new mongoose.Schema({
	projectTypes: { type: String, required: true },
	projectBudget: { type: String, required: true },
	projectCycles: { type: String, required: true },
	project: { type: String, required: true },
	names: { type: String, required: true },
	cellphoneNumber: { type: Number, required: true },
	describe: { type: String, required: true },
	meta: {
		createAt: {
			type: Date,
			default: Date.now()
		}
	}
});

module.exports = mongoose.model('Requirem', RequiremSchema);
