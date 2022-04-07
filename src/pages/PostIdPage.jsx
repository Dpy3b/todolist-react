import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useFetching } from '../hooks/useFetching';
import PostServise from './../API/PostServise';
import { useState } from 'react';
import Loader from '../components/UI/Loader/Loader';
const PostIdPage = () => {
	const params = useParams();
	const [post, setPost] = useState({});
	const [comments, setComments] = useState([]);
	const [fetchPostById, isLoading, error] = useFetching(async id => {
		const responce = await PostServise.getById(id);
		setPost(responce.data);
	});
	const [fetchComments, isComLoading, comError] = useFetching(async id => {
		const responce = await PostServise.getCommentsById(id);
		setComments(responce.data);
	});
	useEffect(() => {
		fetchPostById(params.id);
		fetchComments(params.id);
	}, []);
	return (
		<div>
			<h2>Ты открыл(а) страницу поста с ID = {params.id}</h2>
			{isLoading ? (
				<Loader />
			) : (
				<div>
					{post.id}. {post.title}
				</div>
			)}
			<h3>Комментарии</h3>
			{isComLoading ? (
				<Loader />
			) : (
				<div>
					{comments.map(comm => (
						<div key={comm.id} style={{marginTop: 15}}>
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
