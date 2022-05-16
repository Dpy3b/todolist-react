import React, { useContext } from 'react';
import About from '../pages/About';
import Posts from '../pages/Posts';
import Error from '../pages/Error';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import PostIdPage from '../pages/PostIdPage';
import { routes, privateRoutes, publicRoutes } from './../router/routes';
import { AuthContext } from './../context/index';
import Loader from './UI/Loader/Loader';

const AppRouter = () => {
	const { isAuth, isLoading } = useContext(AuthContext); // useContext - хук для глобального хранилища данных, чтобы избежать бесконечную передачу через пропсы и коллбеки, передаем в него контекст как аргумент, и получаем все поля которые мы передали в value в App.js

	if (isLoading) {
		return <Loader />;
	}

	return isAuth ? (
		<Routes>
			{/* отрисовываем все приватные роуты через массив с объектами */}
			{privateRoutes.map(route => (
				<Route key={route.path} element={route.component} path={route.path} />
			))}
			<Route
				path='/todolist-react-dev/login'
				element={<Navigate to='/todolist-react-dev/posts' />}
			/>
			<Route
				path='/todolist-react-dev/*'
				element={<Navigate to='/todolist-react-dev/error' />}
			/>
			{/* <Route path="/posts" element={<Navigate to="/login" replace={true} />} /> */}
			{/* аналог редирект в 6 версии*/}
		</Routes>
	) : (
		<Routes>
			{/* отрисовываем все публичные роуты через массив с объектами */}
			{publicRoutes.map(route => (
				<Route
					key={route.path}
					element={route.component}
					path={route.path}
					/* exact={route.exact} */ // в 6 роутере exact это легаси которое не нужно
				/>
			))}
			<Route
				path='/todolist-react-dev/*'
				element={<Navigate to='/todolist-react-dev/login' />}
			/>
			{/* ВЫШЕ ПРАВИЛЬНЫЙ РЕДИРЕКТ ШЕСТОЙ ВЕРСИИ */}
		</Routes>
	);
};

export default AppRouter;
