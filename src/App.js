import React from 'react';
import { useState, useEffect } from 'react';
import './styles/App.scss'; // импорт стилей
import Navbar from './components/UI/Navbar/Navbar';
import AppRouter from './components/AppRouter';
import { BrowserRouter as Router, Navigate } from 'react-router-dom';
import { AuthContext } from './context';

const App = () => {
	const [isAuth, setIsAuth] = useState(false); // состояние аутентификации для всего приложения
	const [isLoading, setLoading] = useState(true); // состояние индикации запроса

	// ниже проверка на "авторизованность"
	useEffect(() => {
		if (localStorage.getItem('auth')) {
			setIsAuth(true);
		}
		// строчку ниже по идее можно не писать, т.к. по дефолту isAuth и так false
		// а нет, там короче кое-что происходит, и эта строчка обязана быть
		setLoading(false);
	});
	return (
		// вот тут короче импортируем контекст для всего приложения, обращаемся к провайдеру внутри негоб пихаем всё приложение в него короче
		// поскольку ключ и значения имеют одинаковые названия, можем написать так, тоже самое что и isAuth: isAuth, setIsAuth: setIsAuth и т.д.
		<AuthContext.Provider value={{ isAuth, setIsAuth, isLoading }}>
			<Router>
				<Navbar />
				<AppRouter />
			</Router>
		</AuthContext.Provider>
	);
};

export default App;
