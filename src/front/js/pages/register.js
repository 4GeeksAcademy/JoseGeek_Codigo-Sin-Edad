import React from "react";
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
import { Button } from "@react-login-page/page2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone, faUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const styles = {
  height: "100vh",
  background:
    "linear-gradient(90deg, rgba(41,51,92,1) 0%, rgba(0,95,113,1) 100%)",
};

const Register = () => (
  <div style={styles}>
    <LoginPage style={styles}>
      <Logo style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <img style={{ height: "2rem" }} src={logo} alt="logo" />
        <h3>Registrarse</h3>
      </Logo>
      <LoginPage.Banner>
        <img src={defaultBannerImage} />
      </LoginPage.Banner>
      <Input
        name="email"
        index={1}
        placeholder="Correo electronico"
        typeof="text"
      >
        <FontAwesomeIcon icon={faEnvelope} />
      </Input>
      <Input name="phone" index={1} placeholder="Telefono" typeof="number">
        <FontAwesomeIcon icon={faPhone} />
      </Input>
      <Password placeholder="Contraseña" name="password" index={2} />
      <Submit style={{ background: "red" }}>
        <Link className="register_link" to={"/login"}>
          Volver
        </Link>
      </Submit>
      <Reset>Registrarse</Reset>
      <Title visible={false} />
    </LoginPage>
  </div>
);

export default Register;
