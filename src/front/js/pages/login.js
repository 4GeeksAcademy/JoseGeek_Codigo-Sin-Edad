import React from "react";
import LoginPage, {
  Password,
  Submit,
  Title,
  Logo,
  Reset,
  ButtonAfter,
  Input,
  Email,
} from "@react-login-page/page2";
import defaultBannerImage from "@react-login-page/page2/banner-image";
import "../../styles/login.css";
import logo from "../../../../public/img/logo.png";
import { Link } from "react-router-dom";

const styles = {
  height: "100vh",
  background:
    "linear-gradient(90deg, rgba(41,51,92,1) 0%, rgba(0,95,113,1) 100%)",
};

const LoginHome = () => {
  return (
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
        <Logo style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <img style={{ height: "2rem" }} src={logo} alt="logo" />
          <h3>Ingresar</h3>
        </Logo>
        <LoginPage.Banner>
          <img src={defaultBannerImage} />
        </LoginPage.Banner>
        <Email placeholder="Ingresa tu correo" name="user" />
        <Password placeholder="Contraseña" name="password" />
        <Submit className="button_login">Acceder</Submit>
        <Reset className="button_login">
          <Link className="register_link" to={"/register"}>
            Registrarse
          </Link>
        </Reset>
        <Title visible={false} />
        <ButtonAfter>
          Olvido el <a href="#">Usuario / Contraseña?</a>
        </ButtonAfter>
      </LoginPage>
    </div>
  );
};

export default LoginHome;
