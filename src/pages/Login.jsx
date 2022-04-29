import React from "react";
import MyInput from './../components/UI/Input/MyInput';
import MyButton from './../components/UI/button/MyButton';
import { AuthContext } from './../context/index';
import { useContext } from "react";


const Login = () => {
	const {isAuth, setIsAuth} = useContext(AuthContext) // состояние для состояния аутентификации

	// функция логина, изменяем в ней состояние аутентификации
	const login = event => {
		event.preventDefault();
		setIsAuth(true);
		localStorage.setItem('auth', 'true'); // ключ и значение в localStorage должны быть строками
	}
  return (
		<div>
			<h2>Страница авторизации</h2>
			<form onSubmit={login}>
				<MyInput type="text" placeholder="Введите логин" />
				<MyInput type="text" placeholder="Введите пароль" />
				<MyButton>Войти</MyButton>
			</form>
		</div>
	);
};

export default Login;
