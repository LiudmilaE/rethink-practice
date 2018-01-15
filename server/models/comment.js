"use strict"
const r = require('rethinkdb');

let connection = null
//Connecting to db
r.connect({ host: 'localhost', port: 28015, db: 'blog-project' }, (err, conn) => {
    if (err) throw errconnection = conn

    console.log('Connected to RethinkDB from comment model')
})

//comment model goes here
class Comment {
  find () {
		if (r.table('comments').isEmpty()) {
			return Promise.resolve([])
		}
    return r.table('comments').run(connection)
    .then(cursor => cursor.toArray((err, result) => {
      if (err) throw err
        //console.log(result)
        return result
			})
		)
  }
}

module.exports = Comment

// const mongoose = require('mongoose');
// const timestamps = require('mongoose-timestamp');
// const Schema = mongoose.Schema;

// const commentSchema = new Schema({
//     text: { 
//         type: String, 
//         required: true,
//     },
//     writerId: { 
// 		type: Schema.Types.ObjectId,
// 		required: true,
// 		ref: 'User' 
//     },
//     articleId: { 
// 		type: Schema.Types.ObjectId,
// 		required: true,
// 		ref: 'Article' 
// 	},
// });

// commentSchema.plugin(timestamps);

// module.exports = mongoose.model('Comment', commentSchema)