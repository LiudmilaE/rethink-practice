"use strict"
const r = require('rethinkdb');
let connection = null 
//Connecting to db
r.connect({ host: 'localhost', port: 28015, db: "blog_project" }, (err, conn) => {
	if (err) throw err
	connection = conn

	console.log('Connected to RethinkDB from article model')
})


//article model goes here
class Article {
    save(articleData) {
      if(articleData) {
				r.table('articles').insert(articleData).run(connection)
				.then((data) => {
					console.log(data)
					//findArticle
				})
      } else {
        return { message : "Somethin goes wrong " }
      }
    }
}

module.exports = Article;

// const mongoose = require('mongoose');
// const timestamps = require('mongoose-timestamp');
// const Schema = mongoose.Schema;

// const articleSchema = new Schema({
//     title: { 
//         type: String, 
//         required: true,
//     },
//     content: { 
//         type: String, 
//         required: true,
//     },
//     authorId: { 
// 		type: Schema.Types.ObjectId,
// 		required: true,
// 		ref: 'User' 
// 	},
// });

// articleSchema.plugin(timestamps);

// module.exports = mongoose.model('Article', articleSchema)