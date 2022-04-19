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
	/* [
		{ id: 1, title: 'Javascript', body: 'тфьу' },
		{ id: 2, title: 'Html', body: 'asdDescription' },
		{ id: 3, title: 'Css', body: '123' },
		{ id: 4, title: 'Javascript 4', body: 'афафбба' },
	] */
	//const [isPostLoading, setIsPostLoading] = useState(false);

	const [filter, setFilter] = useState({ sort: '', query: '' });
	/* const bodyInputRef = useRef(); */
	const [modal, setModal] = useState(false);
	const [totalPages, setTotalPages] = useState(0);
	const [limit, setLimit] = useState(10);
	const [page, setPage] = useState(1);
	//const [selectedSort, setSelectedSort] = useState('');
	//const [searchQuery, setSearchQuery] = useState('');
	const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
	//const [isPostsLoading, setIsPostLoading] = useState('')
	/* function getSortedPosts() {} */
	const lastElement = useRef();

	// переписать это с помощью useMemo чтобы не было перерендера, добавить хук юзПагинейшн самому
	const [fetchPosts, isPostsLoading, postError] = useFetching(
		async (limit, page) => {
			const response = await PostServise.getAll(limit, page);
			setPosts([...posts, ...response.data]);
			const totalCount = response.headers['x-total-count'];
			setTotalPages(getPageCount(totalCount, limit));
		}
	);

	useObserver(lastElement, page < totalPages, isPostsLoading, () => {
		setPage(page + 1);
	});

	useEffect(() => {
		fetchPosts(limit, page);
	}, [page, limit]);

	const createPost = newPost => {
		setPosts([...posts, newPost]);
		setModal(false);
	};

	/* async function fetchPosts() {
		setIsPostLoading(true);

		setIsPostLoading(false);
	} */
	const removePost = post => {
		setPosts(posts.filter(p => p.id !== post.id));
	};

	const changePage = page => {
		setPage(page);
	};
	/* const sortPosts = sort => {
		setSelectedSort(sort);
	}; */
	/* const [posts2, setPosts2] = useState([
        { id: 1, title: "Python", body: "Description" },
        { id: 2, title: "Python 2", body: "Description" },
        { id: 3, title: "Python 3", body: "Description" },
        { id: 4, title: "Python 4", body: "Description" },
    ]); */
	/* const [value, setValue] = useState("Текст в инпуте");
  function increment() {
    setLikes(likes + 1);
  }
  function decrement() {
    setLikes(likes - 1);
  } */
	return (
		<div className="App">
			{/* классовый компонент */}
			{/* <ClassCounter/> */}
			{/* ниже функциональный компонент */}
			{/* <Counter />
      <h1>{likes}</h1>
      <h1>{value}</h1>
      <input
        type="text"
        value={value}
        onChange = {e => setValue(e.target.value)}
        />
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button> */}
			{/* <PostItem post={{id: 1, title: 'Javascript', body: 'Description'}}/> */}
			{/* <PostItem/>
      <PostItem/> */}
			{/* <button onClick={fetchPosts}>get posts</button> */}
			<MyButton style={{ marginTop: 30 }} onClick={() => setModal(true)}>
				Создать пост
			</MyButton>
			<MyModal visible={modal} setVisible={setModal}>
				<PostForm create={createPost} />
			</MyModal>
			<hr style={{ margin: '15px 0' }} />
			<PostFilter filter={filter} setFilter={setFilter} />
			<MySelect
				value={limit}
				onChange={value => setLimit(value)}
				defaultValue="Кол-во элементов на странице"
				options={[
					{ value: 5, name: 5 },
					{ value: 10, name: 10 },
					{value: 25, name: 25},
					{value: -1, name: 'Показать всё'}
				]}
			/>
			{postError && <h4>Произошла ошибка ${postError}</h4>}
			{isPostsLoading && (
				<div
					style={{ display: 'flex', justifyContent: 'center', marginTop: 50 }}
				>
					<Loader />
				</div>
			)}
			<PostList
				remove={removePost}
				posts={sortedAndSearchedPosts}
				title="Посты про JS"
			/>
			<div
				ref={lastElement}
				style={{ height: 20, backgroundColor: 'coral' }}
			></div>
			<Pagination page={page} changePage={changePage} totalPages={totalPages} />
			{/* <PostList posts={posts2} title='Посты про Python'/> */}
		</div>
	);
}

export default Posts;
