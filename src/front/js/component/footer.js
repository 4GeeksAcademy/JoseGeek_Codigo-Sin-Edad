import React from "react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import "../../styles/footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer" role="contentinfo">
      <div className="footer-container">
        <div className="footer-text">
          <p className="footer-text-paragraph">
            &copy; {new Date().getFullYear()} Jose Geek. All rights reserved.
          </p>
        </div>
        <div className="footer-icons">
          <Link to="https://www.linkedin.com/in/jose-mar%C3%ADa-rodr%C3%ADguez-116328135/">
            <FaLinkedin />
          </Link>
          <Link to="https://github.com/JoseGeek78">
            <FaGithub />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
