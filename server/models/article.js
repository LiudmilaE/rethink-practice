"use strict"
const r = require('rethinkdb');
var sockio = require("socket.io");
var io = sockio.listen()

let connection = null 
//Connecting to db
r.connect({ host: 'localhost', port: 28015, db: "blog_project" }, (err, conn) => {
	if (err) throw err
	connection = conn

	// //Does the table exist?
	// r.table('articles').limit(1).run(connection, function(error, cursor){
	// 	var promise;
	// 	if (error) {
	// 		console.log('Creating table...');
	// 		promise = r.tableCreate('articles').run(connection);
	// 	} else {
	// 		promise = cursor.toArray();
	// 	}

	// 	//The table exists, setup the update listener
	// 	promise.then(function(result) {

	// 		console.log("Setting up update listener...")
	// 			//TODO start  the changefeed 
	// 			//.filter(r.row('old_val').eq(null)) - filter new inserted
	// 		r.table('articles').changes().run(connection).then(function(cursor) {
	// 			cursor.each(function(err, item) {
	// 				if (item && item.new_val) {  //only when a new article is added
	// 					console.log(item.new_val)
	// 					io.sockets.emit("articleAdd", item.new_val);
	// 				}		
	// 			});
	// 		})
	// 	})
	// })
	//console.log('Connected to RethinkDB from article model')

})

	

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
		
	find (filterData) {
		let f = filterData ? filterData : {}
		return r.table('articles').isEmpty().run(connection)
		.then(cond => {
			if (cond) {
				console.log('No articles yet!', cond)
				return Promise.resolve([])
			} else {
				//sorted by time of creation and limited to 10
				return r.table('articles').filter(f).orderBy(r.desc('timestamp')).limit(10).run(connection)
				.then(cursor => cursor.toArray((err, result)=> {
					if (err) throw err;
					return result
				}))
			}
		}).catch(err => {
			if(err) throw err})
	}

	findById (id) {
		return r.table('articles').get(id).run(connection)
	}

	findByIdAndRemove (id) {
		return r.table('articles').get(id).delete().run(connection)
	}

	findByIdAndUpdate (id, articleData) {
		return r.table('articles').get(id).update(articleData).run(connection)
	}
}

module.exports = Article;
