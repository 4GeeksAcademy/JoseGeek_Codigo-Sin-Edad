import React from "react";
import "../../styles/button.css";
import { Link } from "react-router-dom";

export const Button = ({ text, enlace }) => {
  return (
    <div className="div_button">
      <Link
        style={{ textAlign: "center" }}
        to={enlace}
        className="button_header"
      >
        {text}
      </Link>
    </div>
  );
};
