var models = require('../config/constants').models
let mongoose = require('mongoose')
let ObjectId = mongoose.Schema.ObjectId

var schema = new mongoose.Schema({
	name: { type: String, required: true },
	description: { type: String, required: true },
	created: { type: Number, default: Date.now() },
	// Relations
	creatorId: {type: ObjectId, ref: models.user.name, required: true},
    boardId: { type: ObjectId, ref: models.board, required: true },
	listId: { type: ObjectId, ref: models.list, required: true},
	taskId: { type: ObjectId, ref: models.test, required: true}
});

module.exports = mongoose.model(models.comment.name, schema);