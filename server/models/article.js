"use strict"
const r = require('rethinkdb');

let connection = null 
//Connecting to db
r.connect({ host: 'localhost', port: 28015, db: "blog_project" }, (err, conn) => {
	if (err) throw err
	connection = conn

	//console.log('Connected to RethinkDB from article model')
})

r.table('articles').changes().run(connection)

//article model goes here
class Article {
    save(articleData) {
      if(articleData) {
				//obj with generated_keys
				return r.table('articles').insert(articleData).run(connection) 
      } else {
        return { message : "Something goes wrong " }
      }
		}
		
		find () {
			return r.table('articles').isEmpty().run(connection)
			.then(cond => {
				if (cond) {
					console.log('No articles yet!', cond)
					return Promise.resolve([])
				} else {
					//sorted by time of creation
					return r.table('articles').orderBy(r.desc('timestamp')).run(connection)
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

		findByIdAndUpdate (id, articleData) {
			return r.table('articles').get(id).update(articleData).run(connection)
		}
}

module.exports = Article;
