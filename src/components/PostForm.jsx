import React, { useState } from 'react';
import MyInput from './UI/Input/MyInput';
import MyButton from './UI/button/MyButton';
function PostForm({ create }) {
	const [post, setPost] = useState({ title: '', body: '' });

	const addNewPost = e => {
		e.preventDefault();
		const newPost = {
			...post,
			id: Date.now(),
		};
		create(newPost);
		setPost({ title: '', body: '' });
	};
	return (
		<form>
			{/* Управляемый компонент */}
			<MyInput
				value={post.title}
				onChange={e => setPost({ ...post, title: e.target.value })}
				type="text"
				placeholder="Название поста"
			/>
			{/* <input ref={bodyInputRef} type="text"/> */}
			{/* Неуправляемый (неконтролируемый) компонент */}
			<MyInput
				value={post.body}
				type="text"
				placeholder="Описание поста"
				/* ref={bodyInputRef} */
				onChange={e => setPost({ ...post, body: e.target.value })}
			/>
			<MyButton onClick={addNewPost}>Создать пост</MyButton>
		</form>
	);
}

export default PostForm;
