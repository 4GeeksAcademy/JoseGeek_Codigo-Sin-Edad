import React from "react";
import "../../styles/button.css";

export const Button = ({ text, color }) => {
  return (
    <div style={{ marginTop: "3rem" }}>
      <button className="button_header">{text}</button>
    </div>
  );
};
