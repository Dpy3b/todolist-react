import { useState } from 'react';

// принимаем аргументом некоторый коллбэек (запрос, после которого крутилку нужно будет показать)
export const useFetching = callback => {
	const [isLoading, setIsLoading] = useState(false); // состояние для крутилки
	const [error, setError] = useState(''); // состояние для ошибки

	// принимаем здесь аргументы limit и page
	const fetching = async (...args) => {
		try {
			setIsLoading(true); // показываем крутилку
			await callback(...args); // передаем их в коллбек
		} catch (e) {
			setError(e.message); // текст ошибки помещаем в состояние для ошибки, если ошибка была поймана
		} finally {
			setIsLoading(false); // скрываем крутилку вне зависимости от того прошла ошибка или нет
		}
	};
	return [fetching, isLoading, error]; // возвращаем функцию фетчинг, чтобы мы могли вызвать её в нужном месте, возвращаем состояние isLoading и ошибку
}
