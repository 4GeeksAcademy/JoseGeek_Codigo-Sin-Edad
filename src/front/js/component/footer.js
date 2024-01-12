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
          <Link href="{LINKEDIN_LINK}">
            <FaLinkedin />
          </Link>
          <Link href="{GITHUB_LINK}">
            <FaGithub />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
