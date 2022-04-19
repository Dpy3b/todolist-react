import React, { useContext } from 'react';
import About from '../pages/About';
import Posts from '../pages/Posts';
import Error from '../pages/Error';
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Link,
	Navigate,
	Outlet,
} from 'react-router-dom';
import PostIdPage from '../pages/PostIdPage';
import { routes, privateRoutes, publicRoutes } from './../router/routes';
import { AuthContext } from './../context/index';
import Loader from './UI/Loader/Loader';
const AppRouter = () => {
	const {isAuth, isLoading} = useContext(AuthContext)

	if(isLoading){
		return <Loader/>
	}

	return isAuth ? (
		<Routes>
			{privateRoutes.map(route => (
				<Route
					key={route.path}
					element={route.component}
					path={route.path}
					/* exact={route.exact} */
				/>
			))}
			{/* <Route
					path="/login"
					element={<Navigate to="/posts" replace={true} />}
				/> */}

			{/* <Route path="/about" element={<About />} />
			<Route path="/posts" element={<Posts />} />
			<Route path="posts/:id" element={<PostIdPage />} />
			<Route path="/error" element={<Error />} /> */}
			{/* чтобы не городить кучу роутов, динамически подгружаем */}

			{/* <Route path="*" element={<Posts />} /> */}
			{/* <Route path="/posts/:id/*" element={<Error />} /> */}
			{/* 	<Route path="/posts" element={<Navigate to="/login" replace={true} />} /> */}
			{/* аналог редирект в 6 версии*/}
		</Routes>
	) : (
		<Routes>
			{publicRoutes.map(route => (
				<Route
					key={route.path}
					element={route.component}
					path={route.path}
					/* exact={route.exact} */
				/>
			))}
			<Route
				path="/todolist-react-dev/*"
				element={<Navigate to="/todolist-react-dev/login" />}
			/>
			{/* ВЫШЕ ПРАВИЛЬНЫЙ РЕДИРЕКТ ШЕСТОЙ ВЕРСИИ */}
		</Routes>
	);
};

export default AppRouter;
