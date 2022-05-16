import React from 'react';
import { useNavigate } from 'react-router-dom';
import MyButton from './UI/button/MyButton';

const PostItem = ({post, remove}) => {
	const router = useNavigate(); // старый useHistory() из v5 router-dom

	return (
		<div className='post'>
			<div className='post__content'>
				<strong>
					{post.id}. {post.title}
				</strong>
				<div>{post.body}</div>
			</div>
			<div className='post__btns'>
				<MyButton
					/* переводим на нужный нам маршрут по клику */
					onClick={() => router(`/todolist-react-dev/posts/${post.id}`)}
				>
					Открыть
				</MyButton>
				{/* вызываем через коллбек (чтобы не потерялся this) функцию remove которую получаем из пропсов с аргументом нужного поста, который так же получаем из проспов, по итогу у поста будет айдишник, по которому он и будет удален из массива */}
				<MyButton onClick={() => remove(post)}>Удалить</MyButton>
			</div>
		</div>
	);
};
//, { replace: true }
export default PostItem;
