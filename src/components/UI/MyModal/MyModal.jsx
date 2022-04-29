import React from 'react';
import cl from './MyModal.module.css';

// пропс children принимаем, чтобы иметь возможность помещать внутрь myModal всё что мы захотим
// так же принимаем состояние от родительского компонента, в котором модальное окно будет использоваться, для управления его видимостью
const MyModal = ({ children, visible, setVisible }) => {
	const rootClasses = [cl.myModal];
	// пропс визибл принимаем очевидно чтобы добавлять к className класс .active
	if (visible) {
		rootClasses.push(cl.active);
	}
	return (
		/* вот тут, если мы кликаем на модальное окно вне формы, то изменяем видимость на false и окно закрывается */
		<div className={rootClasses.join(' ')} onClick={() => setVisible(false)}>
			{/* выводим постформ как чилдрен внутрь модального окна */}
			{/* чтобы окно не закрывалось и при клике на саму форму, предотвращаем всплытие */}
			<div className={cl.myModalContent} onClick={e => e.stopPropagation()}>{children}</div>
		</div>
	);
};

export default MyModal;
