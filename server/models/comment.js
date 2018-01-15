"use strict"
const r = require('rethinkdb');

let connection = null
//Connecting to db
r.connect({ host: 'localhost', port: 28015, db: 'blog_project' }, (err, conn) => {
		if (err) throw err
		connection = conn

    //console.log('Connected to RethinkDB from comment model')
})

//comment model goes here
class Comment {
	save(commentData) {
		if(commentData) {
			//obj with generated_keys
			return r.table('comments').insert(commentData).run(connection) 
		} else {
			return { message : "Somethin goes wrong " }
		}
	}

  find () {
		return r.table('comments').isEmpty().run(connection)
		.then(cond => {
			if (cond) {
				console.log('No comments yet!', cond)
				return Promise.resolve([])
			} else {
				return r.table('comments').orderBy(r.desc('timestamp')).run(connection)
				.then(cursor => cursor.toArray((err, result) => {
					if (err) throw err
						//console.log(result)
						return result
					})
				).catch(err => {
					if(err) throw err})
			}
		}) 
	}
	
	findByIdAndRemove (id) {
		return r.table('comments').get(id).delete().run(connection)
	}
}

module.exports = Comment