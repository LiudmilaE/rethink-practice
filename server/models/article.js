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
				//obj with generated_keys
				return r.table('articles').insert(articleData).run(connection) 
      } else {
        return { message : "Somethin goes wrong " }
      }
		}
		
		find () {
			if (r.table('articles').isEmpty()) {
				return Promise.resolve([])
			}
			return r.table('articles').run(connection)
			.then(cursor => cursor.toArray((err, result)=> {
				if (err) throw err;
				return result
			}))
		}

		findByIdAndRemove (id) {
			return r.table('articles').get(id).delete().run(connection)
		}
}

module.exports = Article;
