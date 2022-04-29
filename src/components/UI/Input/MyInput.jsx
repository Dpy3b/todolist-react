import React from "react";
import classes from "./MyInput.module.css";
const MyInput = React.forwardRef((props, ref) => {
	// тоже самое что и с кнопкой, нам будет нужно передавать пропсы извне в этот компонент, опять же через spread ниже, таким образом, все компоненты которые мы будем передавать в myInput, будут улетать в этот инпут ниже
	return <input ref={ref} className={classes.myInput} {...props} />;
});

export default MyInput;
