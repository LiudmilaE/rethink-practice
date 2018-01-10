import axios from 'axios';

function errHandler(err) {
	console.error('API articles: ', err);
}

const commentsApi = axios.create({
  baseURL: "http://localhost:3000/api/comments"
});

//create new comment
export function addComment (commentInfo) {
	return commentsApi
		.post('/', commentInfo)
		.then(response => {
			return response.data;
		})
}

//list of comments
export function showComments () {
	return commentsApi
		.get('/')
		.then(response => {
			return response.data;
		})
}

export function deleteComment(id) {
	return commentsApi.delete('/'+id)
}