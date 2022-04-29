// функция для подсчета количества страниц

import { useMemo } from "react";

// принимает аргументами общее количество постов и лимит постов на страницу
export const getPageCount = (totalCount, limit) => {
	return Math.ceil(totalCount / limit); // округляем в большую сторону
};


// старый вариант
/* export const getPagesArray = (totalPages) => {
	let result = [];
	for (let i = 0; i < totalPages; i++) {
		result.push(i + 1);
	}
	return result;
};
 */


// улучшенный вариант, свой кастомный хук
export const usePagination = totalPages => {
	// используем юзмемо чтобы не было лишних рендеров и пересчётов массива с кол-вом страниц
	const getPagesArray = useMemo(() => {
		let result = [];
		for (let i = 0; i < totalPages; i++) {
			result.push(i + 1);
		}
		return result;
	}, [totalPages]);

	return getPagesArray;
};