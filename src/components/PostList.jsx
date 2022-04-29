import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import PostItem from './PostItem';

// вот здесь ниже эту функцию remove мы принимаем как пропс ну и естественно разворачиваем через деструктуризацию
const PostList = ({ posts, title, remove }) => {
	// пиздец, написал ниже явно что !posts.length === 0 и оно сразу стало норм работать, ох уж этот тайпскрипт (а точнее его отсутствие 😉)
	// ниже условная отрисовка, если постов нету
	if (posts.length === 0 ) {
		return <h1 style={{ textAlign: 'center' }}>Посты не найдены</h1>;
	}
	return (
		<div>
			<h1 style={{ textAlign: 'center' }}>{title}</h1>
			<TransitionGroup>
				{posts.map(post => (
					<CSSTransition key={post.id} timeout={500} classNames='post'>
						{/* передаем remove ещё ниже на 2 уровень компоненту PostItem так же передаем нужный пост из пропсов */}
						<PostItem remove={remove} post={post} />
					</CSSTransition>
				))}
			</TransitionGroup>
		</div>
	);
};

export default PostList;
