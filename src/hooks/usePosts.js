import { useMemo } from 'react';

// тут у нас два кастомных пользовательских хука
export const useSortedPosts = (posts, sort) => {
	const sortedPosts = useMemo(() => {
		if (sort) {
			return [...posts].sort((a, b) => a[sort].localeCompare(b[sort]));
		}
		return posts;
	}, [sort, posts]);
	return sortedPosts; // возвращаем отсортированный массив
};

// пропс квери (запрос) это поисковая строка
export const usePosts = (posts, sort, query) => {
	// сортируем посты
	const sortedPosts = useSortedPosts(posts, sort);
	// ниже возвращаем и отфильтрованный, и отсортированный массив
	const sortedAndSearchedPosts = useMemo(() => {
		return sortedPosts.filter(post =>
			post.title.toLowerCase().includes(query.toLowerCase())
		);
	}, [query, sortedPosts]);
	return sortedAndSearchedPosts;
};
