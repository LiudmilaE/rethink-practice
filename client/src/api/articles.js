import axios from 'axios';

function errHandler(err) {
    console.error('API articles: ', err);
}

const articlesApi = axios.create({
    baseURL: "http://localhost:3000/api/articles"
});

export function addArticle (articleInfo) {
	return articlesApi
		.post('/', articleInfo)
		.then(response => {
			return response.data;
		});
}

export function showArticles () {
	return articlesApi
		.get('/')
		.then(response => {
			return response.data;
		});
}