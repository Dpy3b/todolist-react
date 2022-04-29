import React from 'react';
import { getPagesArray, usePagination } from '../../../utils/pages';

const Pagination = ({ totalPages, page, changePage }) => {
	//let pagesArray = getPagesArray(totalPages); // старая функция без useMemo

	// используем кастомный хук основанный на useMemo чтобы не было лишних перерендеров и пересчетов
	// получаем массив с кол-вом страниц
	let pagesArray = usePagination(totalPages);

	return (
		<div className='page__wrapper'>
			{/* отрисовываем страницы в виде пагинации */}
			{pagesArray.map(p => (
				<span
					/* передаем в функцию для изменения страницы номер страницы, на которую нажал пользователь */
					onClick={() => changePage(p)}
					key={p}
					/* если номер страницы равен его состоянию, тогда подсвечиваем, т.е. добавляем класс с рамкой, в другом случае стили обычные */
					className={page === p ? 'page page__current' : 'page'}
				>
					{p}
				</span> // сам догадался проставить ключ как номер страницы
			))}
		</div>
	);
};

export default Pagination;
