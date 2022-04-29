import axios from 'axios';

export default class PostServise {

	// с сервера мы получаем объекты такого типа
	/* [
		{ id: 1, title: 'Javascript', body: 'тфьу' },
		{ id: 2, title: 'Html', body: 'asdDescription' },
		{ id: 3, title: 'Css', body: '123' },
		{ id: 4, title: 'Javascript 4', body: 'афафбба' },
	]
	*/
	static async getAll(limit = 10, page = 1) {
		const response = await axios.get(
			'https://jsonplaceholder.typicode.com/posts',
			//ниже фича аксиоса для параметров запроса к серверу, лимит итогового подгружения постов на страницу + номер страницы
			// в документации второй параметр axios.get это axios.get(url[, config]), короче некоторые опции, где мы можем указать че нам нужно, и аксиос подставит наши квери-параметры в строку запроса сам, с нужными нам значениями естественно
			{
				params: {
					_limit: limit,
					_page: page,
				},
			}
		);
		return response;
	}

	static async getById(id) {
		const response = await axios.get(
			'https://jsonplaceholder.typicode.com/posts/' + id
		);
		return response;
	}

	static async getCommentsById(id) {
		const response = await axios.get(
			`https://jsonplaceholder.typicode.com/posts/${id}/comments`
		);
		return response;
	}
}
