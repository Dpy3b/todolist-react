import Posts from '../pages/Posts';
import About from './../pages/About';
import PostIdPage from './../pages/PostIdPage';
import Login from './../pages/Login';

export const privateRoutes = [
	{ path: '/about', component: <About /> },
	{ path: '/posts', component: <Posts /> },
	{ path: 'posts/:id', component: <PostIdPage />},
	{ path: '*', component: <Posts /> },
];

export const publicRoutes = [
	{ path: '/login', component: <Login /> },
];