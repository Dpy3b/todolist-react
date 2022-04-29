import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useFetching } from '../hooks/useFetching';
import PostServise from './../API/PostServise';
import { useState } from 'react';
import Loader from '../components/UI/Loader/Loader';
const PostIdPage = () => {
	const params = useParams(); // чтобы выцепить параметр из url // в нашем случае айдишник {id: "2"} условный

	const [post, setPost] = useState({}); // состояние для поста
	const [comments, setComments] = useState([]); // состояние для комментариев

	// функция для загрузки поста по id
	const [fetchPostById, isLoading, error] = useFetching(async id => {
		const responce = await PostServise.getById(id);
		setPost(responce.data);
	});

	// функция для загрузки комментариев к посту по id поста
	const [fetchComments, isComLoading, comError] = useFetching(async id => {
		const responce = await PostServise.getCommentsById(id);
		setComments(responce.data);
	});
	// эти две функции будут срабатывать один раз, при первой загрузке компонента, т.к. у нас пустой массив зависимостей, т.е. тупа подгружаем пост по айдишнику, ну и комментарии к нему тоже по айдишнику, достаем их из параметров которые выцепляем из url
	useEffect(() => {
		fetchPostById(params.id);
		fetchComments(params.id);
	}, []);
	return (
		<div style={{ margin: '30px 50px 0'}}>
			<h2>Ты открыл(а) страницу поста с ID = {params.id}</h2>
			{isLoading ? (
				<Loader />
			) : (
				<div style={{marginBottom: 30}}>
					{post.id}. {post.title}
				</div>
			)}
			<h3>Комментарии</h3>
			{isComLoading ? (
				<Loader />
			) : (
				<div>
					{comments.map(comm => (
						<div key={comm.id} style={{ marginTop: 15 }}>
							<h5>{comm.email}</h5>
							<div>{comm.body}</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default PostIdPage;
