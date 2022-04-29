import React from 'react';
import { useNavigate } from 'react-router-dom';
import MyButton from './UI/button/MyButton';

const PostItem = props => {
	const router = useNavigate(); // старый useHistory()

	return (
		<div className='post'>
			<div className='post__content'>
				<strong>
					{props.post.id}. {props.post.title}
				</strong>
				<div>{props.post.body}</div>
			</div>
			<div className='post__btns'>
				<MyButton
					/* переводим на нужный нам маршрут по клику */
					onClick={() => router(`/todolist-react-dev/posts/${props.post.id}`)}
				>
					Открыть
				</MyButton>
				{/* вызываем через коллбек (чтобы не потерялся this) функцию remove которую получаем из пропсов с аргументом нужного поста, который так же получаем из проспов, по итогу у поста будет айдишник, по которому он и будет удален из массива */}
				<MyButton onClick={() => props.remove(props.post)}>Удалить</MyButton>
			</div>
		</div>
	);
};
//, { replace: true }
export default PostItem;
