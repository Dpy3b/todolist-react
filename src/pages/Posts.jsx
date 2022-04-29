import { useMemo, useRef, useState, useEffect, useCallback } from 'react';
//import ClassCounter from "./components/ClassCounter";
//import Counter from "./components/counter";
import PostForm from '../components/PostForm';
//import PostItem from "./components/PostItem";
import PostList from '../components/PostList';
import MyButton from '../components/UI/button/MyButton';
//import MyInput from "./components/UI/Input/MyInput";
import '../styles/App.scss';
import MySelect from '../components/UI/select/MySelect';
import MyInput from '../components/UI/Input/MyInput';
import PostFilter from '../components/PostFilter';
import MyModal from '../components/UI/MyModal/MyModal';
import { usePosts } from '../hooks/usePosts';
import axios from 'axios';
import PostServise from '../API/PostServise';
import Loader from '../components/UI/Loader/Loader';
import { useFetching } from '../hooks/useFetching';
import { getPageCount, getPagesArray } from '../utils/pages';
import Pagination from '../components/UI/pagination/Pagination';
import { useObserver } from './../hooks/useObserver';

function Posts() {
	const [posts, setPosts] = useState([]);

	//const [isPostLoading, setIsPostLoading] = useState(false); // состояния для преддеактивации надписи "посты не найдены"
	// нам оно не нужно т.к. мы реализовали всё что хотели в хуке useFetching

	// изначальный вариант функции для получения постов через axios и через крутилку
	// тут чутка написан бред, но опять же, мы уже всё реализовали в useFetching
	/*
	async function fetchPosts() {
		setIsPostLoading(true);
		тут типа фетчим посты
		setIsPostLoading(false);
	}
	*/

	// это я делал для демонстрации неуправляемого инпута (второго) в PostForm
	/* const bodyInputRef = useRef(); */

	// вот эти два состояния в результате декомпозиции в PostFilter можно спокойно удалять, мы заменили их состоянием [filter, setFilter] ниже
	//const [searchQuery, setSearchQuery] = useState('');
	//const [selectedSort, setSelectedSort] = useState('');

	const [filter, setFilter] = useState({ sort: '', query: '' }); // отвечает за логику работы сортировки
	const [modal, setModal] = useState(false); // состояние для управления видимостью модального окна
	const [totalPages, setTotalPages] = useState(0); // состояние для общего кол-ва подгружаемых постов
	const [limit, setLimit] = useState(10); // состояние для лимита постов на страницу
	const [page, setPage] = useState(1); // состояние для текущей страницы

	const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query); // используем кастомный хук для поиска уже отсортированных постов

	const lastElement = useRef(); // для получения ссылки на дом-элемент, находящимся последним в списке на странице

	// переписать это с помощью useMemo чтобы не было перерендера, добавить хук юзПагинейшн самому
	// нам этот кастомный хук по итогу возвращает массив из 3х элементов которыми мы можем управлять как хотим где угодно
	const [fetchPosts, isPostsLoading, postError] = useFetching(
		// принимаем в саму функцию для получения постов limit и page, это второй вариант решения проблемы, уже без useEffect
		async (limit, page) => {
			const response = await PostServise.getAll(limit, page); // получаем тупа все данные (с применением нужных нам параметров)
			setPosts([...posts, ...response.data]); // в response.data у нас сотня объектов понятно какого типа из аксиоса
			const totalCount = response.headers['x-total-count']; // т.к. мы указали квери-параметры в PostServise, обращаемся к заголовкам присланного нам ответа и достаем кол-во постов
			setTotalPages(getPageCount(totalCount, limit)); // ну и тут все очевидно, передаем в состояние общего количества страниц для постов функцию, которая нам подсчитывает количество через деление кол-ва постов на лимит постов на страницу
		}
	);

	// Intersection Observer API на кастомном хуке
	// каждый раз когда lastElement будет появляться в зоне видимости, будет отрабатывать наш кастомный хук
	// второй параметр - ограничитель, разрешающий загрузку постов
	useObserver(lastElement, page < totalPages, isPostsLoading, () => {
		setPage(page + 1); // здесь меняем текущую страницу
	});

	useEffect(() => {
		fetchPosts(limit, page); // посты будут загружаться каждый раз, когда изменится параметр page либо limit // вызываем fetchPosts именно здесь, чтобы не было проблем с асинхронностью у состояния
	}, [page, limit]); //page мы засунули сюда чтобы при изменении текущей страницы через setPage у нас не было отставаний

	// функция создания новых постов через пропс create
	const createPost = newPost => {
		setPosts([...posts, newPost]); // разворачиваем старый массив с постами, и в конец добавляем новый пост
		setModal(false);
	};

	// такой же принцип как и у createPost, внутри дочернего компонента мы так же не имеем доступ к состоянию родительского, а значит используем специальный пропс с коллбеком для передачи данных снизу вверх
	// получаем пост из дочернего компонента
	const removePost = post => {
		// возвращаем массив без того поста который мы отсеяли по айдишнику
		setPosts(posts.filter(p => p.id !== post.id));
	};

	//функция для изменения страницы по её номеру, аргументом передаем номер страницы на которую нажал пользователь
	const changePage = page => {
		setPage(page);
		//fetchPosts() // т.к. функция fetchPosts использует в себе состояние, то если вызвать её здесь, то т.к. изменение состояния это асинхронный процесс - то вверху page будет попадать в запрос с некоторым отставанием
		// ещё как вариант это сделать без юзэффекта, вызываем тут тогда fetchPosts(limit, page)
	};

	// это я делал для поиска, всё это ниже мы по сути перенесли в результате декомпозиции в кастомный хук usePosts.js

	//функция ниже нам уже не нужна, мы перенесли её логику в sortedPosts
	/*
	function getSortedPosts() {
		if (selectedSort) {
			return [...posts].sort((a, b) =>
				a[selectedSort].localCompare(b[selectedSort])
			);
		}
	}

	const sortedPosts = useMemo(() => {
		if (sort) {
			return [...posts].sort((a, b) => a[sort].localeCompare(b[sort]));
		}
		return posts;
	}, [selectedSort, posts]);
	*/

	// ниже мы всё это заменили на более совершенные алгоритмы
	//const [selectedSort, setSelectedSort] = useState(''); // создали состояние для двустороннего связывания для фильтрации у селекта
	/*
	const sortPosts = sort => {
		setSelectedSort(sort);
		setPosts([...posts].sort((a, b) => a[sort].localCompare(b[sort]))
	};
	*/

	return (
		<div className='App'>
			{/* <button onClick={fetchPosts}>get posts</button> */}
			<MyButton style={{ marginTop: 30 }} onClick={() => setModal(true)}>
				Создать пост
			</MyButton>
			<MyModal visible={modal} setVisible={setModal}>
				{/* передаем пропс create с функцией обратного вызова для передачи данных снизу вверх */}
				{/* кстати мы запихиваем в модалку PostForm благодаря children (но это уже в самом компоненте) */}
				<PostForm create={createPost} />
			</MyModal>
			<hr style={{ margin: '15px 0' }} />
			{/* передаем пропсами состояние, и функцию которая его изменяет в наш компонент */}
			<PostFilter filter={filter} setFilter={setFilter} />
			<MySelect
				// здесб limit это кол-во выводимых постов на странице
				value={limit}
				onChange={value => setLimit(value)}
				defaultValue='Кол-во элементов на странице'
				options={[
					{ value: 5, name: 5 },
					{ value: 10, name: 10 },
					{ value: 25, name: 25 },
					{ value: -1, name: 'Показать всё' }, // получаем все посты если value -1
				]}
			/>
			{postError && (
				<h4 style={{ textAlign: 'center' }}>Произошла ошибка ${postError}</h4>
			)}
			<PostList
				remove={removePost}
				posts={sortedAndSearchedPosts}
				title='Посты про JS'
			/>
			<div
				/* условно последний элемент это тупа эта полоска */
				ref={lastElement}
				style={{ height: 20, backgroundColor: 'coral' }}
			></div>
			{isPostsLoading && (
				<div
					style={{ display: 'flex', justifyContent: 'center', marginTop: 50 }}
				>
					<Loader />
				</div>
			)}
			{/* пропс page здесь - номер страницыс постами, остальное очевидно */}
			<Pagination page={page} changePage={changePage} totalPages={totalPages} />
		</div>
	);
}

export default Posts;
