import React from "react";
import { useNavigate } from "react-router-dom";
import { FaInstagram, FaLinkedin } from "react-icons/fa";

import ContentWrapper from "../ContentWrapper/ContentWrapper";
import { AiOutlineShoppingCart } from "react-icons/ai";

import "./Style.scss";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer className="footer">
      <ContentWrapper>
        <ul className="menuItems">
          <li className="menuItem" onClick={() => navigate("/")}>
            Home
          </li>
          <li className="menuItem" onClick={() => navigate("/products")}>
            Products
          </li>
          <li className="menuItem" onClick={() => navigate("/profile")}>
            Profile
          </li>
          <li className="menuItem" onClick={() => navigate("/cart")}>
            Cart <AiOutlineShoppingCart />
          </li>
        </ul>
        <div className="infoText">
          Carry home your dreams with ShopBag - Your one-stop destination for
          all your shopping needs, Your ultimate destination for online
          shopping pleasure! Discover a wide selection of top-quality products
          and enjoy seamless checkout with our secure and user-friendly shopbag.
          Shop now and experience the joy of convenient, delightful shopping!
        </div>
        <div className="socialIcons">
          <span>
            <a
              href="https://www.instagram.com/virmaniricky/"
              target="_blank"
              className="icon"
            >
              <FaInstagram />
            </a>
          </span>
          <span>
            <a
              href="https://www.linkedin.com/in/puneet-virmani-522749213/"
              target="_blank"
              className="icon"
            >
              <FaLinkedin />
            </a>
          </span>
        </div>
      </ContentWrapper>
    </footer>
  );
};

export default Footer;
