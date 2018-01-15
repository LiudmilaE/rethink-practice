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
			return r.table('articles').isEmpty().run(connection)
			.then(cond => {
				if (cond) {
					console.log('No articles yet!', cond)
					return Promise.resolve([])
				} else {
					return r.table('articles').run(connection)
					.then(cursor => cursor.toArray((err, result)=> {
						if (err) throw err;
						return result
					}))
				}
			}).catch(err => {
				if(err) throw err})
		}

		findByIdAndRemove (id) {
			return r.table('articles').get(id).delete().run(connection)
		}
}

module.exports = Article;
