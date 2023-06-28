import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Auth from "../utils/Auth";
import { useForm } from "../hook/useForm";

function Register({ setIsSuccess, setIsInfoTooltipPopupOpen }) {
  const { values, handleChange, setValues } = useForm({
    email: "",
    password: "",
  });
  // const [registerValue, setRegisterValue] = useState({
  //   email: "",
  //   password: "",
  // });
  const navigate = useNavigate();

  // function hendleChange(evt) {
  //   const {name,value} = evt.target;
  //   setRegisterValue({
  //     ...registerValue,
  //     [name]: value
  //   })
  // }

  function handleSubmit(evt) {
    evt.preventDefault();
    //const { email, password } = registerValue;
    Auth.register(values.email, values.password)
      .then((data) => {
        navigate("/sign-in");
        setIsSuccess(true);
      })
      .catch((err) => {
        setIsSuccess(false);
        console.log(err);
      })
      .finally(() => {
        setIsInfoTooltipPopupOpen(true);
      });
  }
  useEffect(() => {
    setValues({ email: "", password: "" });
  }, [setValues]);

  return (
    <div className="authen">
      <h2 className="authen__title">Регистрация</h2>
      <form className="authen__form" onSubmit={handleSubmit}>
        <input
          type="email"
          id="email"
          className="authen__input"
          placeholder="Email"
          name="email"
          required
          value={values.email || ""}
          onChange={handleChange}
        />
        <input
          type="password"
          id="password"
          className="authen__input"
          placeholder="Пароль"
          name="password"
          required
          value={values.password || ""}
          onChange={handleChange}
        />
        <button type="submit" className="authen__submit-button">
          Зарегистрироваться
        </button>
        <p className="authen__text">
          Уже зарегистрированы?{" "}
          <Link to="/sign-in" className="authen__text_link">
            {" "}
            Войти
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
