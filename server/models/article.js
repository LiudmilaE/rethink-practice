const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
const Schema = mongoose.Schema;

const articleSchema = new Schema({
    title: { 
        type: String, 
        required: true,
    },
    content: { 
        type: String, 
        required: true,
    },
    authorId: { 
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'User' 
	},
});

articleSchema.plugin(timestamps);

module.exports = mongoose.model('Article', articleSchema)