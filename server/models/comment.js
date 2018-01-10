const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    text: { 
        type: String, 
        required: true,
    },
    writerId: { 
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'User' 
    },
    articleId: { 
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'Article' 
	},
});

commentSchema.plugin(timestamps);

module.exports = mongoose.model('Comment', commentSchema)