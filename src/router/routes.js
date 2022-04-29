import Posts from '../pages/Posts';
import About from './../pages/About';
import PostIdPage from './../pages/PostIdPage';
import Login from './../pages/Login';

// описываем все необходимые маршруты в массиве как объекты
export const privateRoutes = [
	{ path: '/todolist-react-dev/about', component: <About /> },
	{ path: '/todolist-react-dev/posts', component: <Posts /> },
	{ path: '/todolist-react-dev/posts/:id', component: <PostIdPage /> },
	{ path: '/todolist-react-dev/*', component: <Posts /> },
];

export const publicRoutes = [
	{ path: '/todolist-react-dev/login', component: <Login /> },
];