import axios from 'axios';

function errHandler(err) {
    console.error('API articles: ', err);
}

const articlesApi = axios.create({
    baseURL: "http://localhost:3000/api/articles"
});

//creates new article
export function addArticle (articleInfo) {
	return articlesApi
		.post('/', articleInfo)
		.then(response => {
			return response.data;
		});
}

//returns list of articles
export function showArticles () {
	return articlesApi
		.get('/')
		.then(response => {
			return response.data;
		});
}

//useful for edit article form ??
// export function showArticle(id) {
// 	return articlesApi
// 		.get('/'+id)
// 		.then(response => {
// 			return response.data;
// 		})
// }

export function updateArticle(id, data) {
	return articlesApi
	.patch('/'+id, data)
	.then(response => response.data)
}

export function deleteArticle(id) {
	return articlesApi.delete('/'+id)
}