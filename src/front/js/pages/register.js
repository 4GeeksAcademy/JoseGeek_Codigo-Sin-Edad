import React, { useContext } from "react";
import "../../styles/login.css";
import logo from "../../../../public/img/logo.png";
import LoginPage, {
  Email,
  Password,
  Submit,
  Title,
  Logo,
  Reset,
  ButtonAfter,
} from "@react-login-page/page2";
import defaultBannerImage from "@react-login-page/page2/banner-image";
import { Input } from "react-login-page";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { useFormRegister } from "../hooks/useFormRegister";

const styles = {
  height: "100vh",
  background:
    "linear-gradient(90deg, rgba(41,51,92,1) 0%, rgba(0,95,113,1) 100%)",
};

const Register = () => {
  const { store, actions } = useContext(Context);

  const {
    password,
    telefono,
    user,
    usuario,
    onInputChange,
    onResetForm,
    handleSubmitRegister,
  } = useFormRegister(store, actions);

  return (
    <>
      <div style={styles}>
        <Link
          to={"/"}
          style={{ margin: "1rem" }}
          type="button"
          className="btn btn-outline-light"
        >
          Volver
        </Link>
        <LoginPage style={styles}>
          <Logo
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <img style={{ height: "2rem" }} src={logo} alt="logo" />
            <h3>Registrarse</h3>
          </Logo>
          <LoginPage.Banner>
            <img src={defaultBannerImage} />
          </LoginPage.Banner>
          <Email
            onChange={onInputChange}
            placeholder="Correo electronico"
            typeof="text"
            name="user"
            value={user}
          />
          <Input
            onChange={onInputChange}
            value={usuario}
            name="usuario"
            index={2}
            placeholder="Usuario"
            typeof="text"
          >
            <FontAwesomeIcon icon={faUser} />
          </Input>
          <Input
            onChange={onInputChange}
            value={telefono}
            name="telefono"
            index={4}
            placeholder="Telefono"
            typeof="number"
          >
            <FontAwesomeIcon icon={faPhone} />
          </Input>
          <Password
            onChange={onInputChange}
            value={password}
            placeholder="Contraseña"
            name="password"
            index={3}
          />
          <Submit index={1} style={{ background: "red" }}>
            <Link className="register_link" to={"/login"}>
              Volver
            </Link>
          </Submit>
          <Reset index={2} onClick={handleSubmitRegister}>
            Registrarse
          </Reset>
          <Title visible={false} />
        </LoginPage>
      </div>
      {/* <Toaster richColors /> */}
    </>
  );
};

export default Register;
