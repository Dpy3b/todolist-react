import { useMemo, useRef, useState, useEffect, useCallback } from 'react';
//import ClassCounter from "./components/ClassCounter";
//import Counter from "./components/counter";
/*import PostForm from './components/PostForm';
//import PostItem from "./components/PostItem";
import PostList from './components/PostList';
import MyButton from './components/UI/button/MyButton';
//import MyInput from "./components/UI/Input/MyInput";

import MySelect from './components/UI/select/MySelect';
import MyInput from './components/UI/Input/MyInput';
import PostFilter from './components/PostFilter';
import MyModal from './components/UI/MyModal/MyModal';
import { usePosts } from './hooks/usePosts';
import axios from 'axios';
import PostServise from './API/PostServise';
import Loader from './components/UI/Loader/Loader';
import { useFetching } from './hooks/useFetching';
import { getPageCount, getPagesArray } from './utils/pages';
import Pagination from './components/UI/pagination/Pagination'; */

import React from 'react';

import './styles/App.scss'; // импорт стилей
import Navbar from './components/UI/Navbar/Navbar';
import AppRouter from './components/AppRouter';
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Link,
	Navigate,
	Outlet,
} from 'react-router-dom';
import { AuthContext } from './context';

const App = () => {
	const[isAuth, setIsAuth] = useState(false) // состояние аутентификации для всего приложения
	const [isLoading, setLoading] = useState(true) // состояние индикации запроса

	// ниже проверка на "авторизованность"
	useEffect(() => {
		if(localStorage.getItem('auth')){
			setIsAuth(true)
		}
		// строчку ниже по идее можно не писать, т.к. по дефолту isAuth и так false
		// а нет, там короче кое-что происходит, и эта строчка обязана быть
		setLoading(false)
	})
	return (
		// вот тут короче импортируем контекст для всего приложения, обращаемся к провайдеру внутри негоб пихаем всё приложение в него короче
		// поскольку ключ и значения имеют одинаковые названия, можем написать так, тоже самое что и isAuth: isAuth, setIsAuth: setIsAuth и т.д.
		<AuthContext.Provider value={{ isAuth, setIsAuth, isLoading }}>
			<Router>
				<Navbar />
				<AppRouter />
				{/* <Navigate replace to="/error" /> */}
				{/* <Route path="/error" render={() => <Navigate to="about-us" />} */}
			</Router>
		</AuthContext.Provider>
	);
};

export default App;
