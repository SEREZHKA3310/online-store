import classes from "./styles.module.css";
import Button from "../../ui/Button/Button";
import useLoginUser from "../../hooks/useLoginUser";
import { useState } from "react";
import { NavLink } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = useLoginUser();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login({ username, password });
  };

  return (
    <div className="container">
      <form className={classes.form} onSubmit={handleSubmit}>
        <p className={classes.header_text}>Вход</p>
        <input
          className={classes.form_input}
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className={classes.form_input}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button className="button_click" type="submit">
          Войти
        </Button>
        <NavLink to={"signup"}>Зарегистрироваться</NavLink>
      </form>
    </div>
  );
};

export default Login;
