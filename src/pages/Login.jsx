import React from "react";
import MyInput from './../components/UI/Input/MyInput';
import MyButton from './../components/UI/button/MyButton';
import { AuthContext } from './../context/index';
import { useContext } from "react";


const Login = () => {
	const {isAuth, setIsAuth} = useContext(AuthContext)
	const login = event => {
		event.preventDefault()
		setIsAuth(true)
		localStorage.setItem('auth', true)
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
