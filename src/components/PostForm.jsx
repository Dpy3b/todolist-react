import React, { useState } from 'react';
import MyInput from './UI/Input/MyInput';
import MyButton from './UI/button/MyButton';



// деструктуризируем пропс create (разворачиваем в коллбек)
function PostForm({ create }) {
	const [post, setPost] = useState({ title: '', body: '' }); // инициализируем состояние поста как объект с полями заголовка и тела

	const addNewPost = e => {
		e.preventDefault(); // предотвращаем дефолтное поведение кнопки
		const newPost = {
			...post, // разворачиваем { title: '', body: '' } в список свойств
			id: Date.now(), // добавляем айдишник
		};

		create(newPost); // передаем в функцию новый пост как аргумент вызова функции createPost в Posts.jsx
		setPost({ title: '', body: '' });
	};
	return (
		<form>
			{/* Управляемый компонент */}
			<MyInput
				value={post.title}
				onChange={e => setPost({ ...post, title: e.target.value })} /* вот тут и ниже в таком же случае мы изменяем только нужное нам поле, а остальной объект оставляем неизменным */
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
