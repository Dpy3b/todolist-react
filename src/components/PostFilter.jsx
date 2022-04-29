import React from "react";
import MyInput from "./UI/Input/MyInput";
import MySelect from "./UI/select/MySelect";

// принимаем
const PostFilter = ({filter, setFilter}) => {
  return (
		<div>
			<div>
				<MyInput
					placeholder="Поиск"
					value={filter.query}
					/* ниже реализуем двустороннее связывание, возвращаем все поля из объекта и заменяем нужное поле */
					onChange={e => setFilter({...filter, query: e.target.value})}
				/>
			</div>
			<div>
				{/* ниже передаем в MySelect все необходимые пропсы */}
				<MySelect
					value={filter.sort}
					/* здесь уже возвращается не event, а выбранный алгорим сортировки (body или title) */
					onChange={selectedSort => setFilter({...filter, sort: selectedSort})}
					defaultValue="Сортировка"
					options={[
						{ value: 'title', name: 'По названию' },
						{ value: 'body', name: 'По описанию' },
					]}
				/>
			</div>
		</div>
	);
};

export default PostFilter;
