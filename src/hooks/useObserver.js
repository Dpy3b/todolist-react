import { useEffect, useRef } from 'react';

// принимает аргументами: ссылку элемента за которым наблюдаем, boolean флаги canLoad и isLoading, ну и коллбек чтобы отправить вверх данные
export const useObserver = (ref, canLoad, isLoading, callback) => {
	// добавляем в массив зависимостей состояние загрузки
	useEffect(() => {
		const observer = useRef; // та самая полоска в конце списка
		if (isLoading) return; // если идет загрузка - делаем выход из коллбека и даже не доходим до создания нового обзервера
		if (observer.current) observer.current.disconnect(); // ести в текущем обзервере что-то находится, отключаем наблюдение за всеми наблюдаемыми элементами в текущий момент через функцию disconnect
		// cb - сокращение callback т.к. один у нас уже есть в пропсах
		var cb = function (entries, observer) {
			// если элемент в зоне видимости, выполняем коллбэк
			// canLoad ограничивает вызов функции ниже
			if (entries[0].isIntersecting && canLoad) {
				callback()
			}
		};
		observer.current = new IntersectionObserver(cb); // помещаем новый в полe current

		observer.current.observe(ref.current); // вызываем функцию obserse и передаем туда дом-элемент, это реф который получаем из пропсов, это по сути LastElement тот

	}, [isLoading]);

}