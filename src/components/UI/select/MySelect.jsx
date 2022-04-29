import React from 'react';

// принимает в себя пропсы: массив опций, дефолтное значение, текущее значение, функция которая сработает при изменении вэлью селекта
const MySelect = ({ options, defaultValue, value, onChange }) => {
	return (
		/* принимаем пропсами текущее значение, ну и onChange чтобы следить за изменением значения внутри селекта и передаем туда значение которое выбрал пользователь */
		<select value={value} onChange={e => onChange(e.target.value)}>
			{/* вешаем на дефолтный опшн неактивное состояние, хотя по сути это какой-то рофлан по факту, просто добавили надпись "сортировка", выглядит так-себе */}
			<option disabled value="">
				{defaultValue}
			</option>
			{/* отрисовываем список опций */}
			{options.map(option => (
				<option key={option.value} value={option.value}>
					{option.name}
				</option>
			))}
		</select>
	);
};

export default MySelect;
