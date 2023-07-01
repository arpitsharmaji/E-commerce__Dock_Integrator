import React, { useEffect, useState } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { VscChromeClose } from "react-icons/vsc";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { AiFillShop } from "react-icons/ai";
import "./Style.scss";
import { useNavigate, useLocation } from "react-router-dom";
import ContentWrapper from "../ContentWrapper/ContentWrapper";
import Avtar from "../../assets/avatar.png";

const Header = () => {
  const [show, setShow] = useState("top");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const controlNavbar = () => {
    if (window.scroll > 200) {
      if (window.scrollY > lastScrollY && !mobileMenu) {
        setShow("hide");
      } else {
        setShow("show");
      }
      setLastScrollY(window.scrollY);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY]);

  const searchQueryHandler = (event) => {
    if (event.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
    }
  };

  const openSearch = () => {
    setShowSearch(true);
  };

  const nevigateToHome = () => {
    navigate("/");
    setShowSearch(false);
  };

  return (
    <header className={`header ${show} `}>
      <ContentWrapper>
        <div className="logo" onClick={nevigateToHome}>
          <AiFillShop />
          ShopBag
        </div>
        <ul className="menuItems">
          <li className="menuItem">
            <HiOutlineSearch onClick={openSearch} />
          </li>
          <li className="menuItem" onClick={()=> navigate('/products')} >
            Products
          </li>

          <li className="menuItem" onClick={() => navigate("/cart")}>
            <AiOutlineShoppingCart />
          </li>
          <li className="menuItem ProfilePicHeader ">
            <img
              src={Avtar}
              alt="profileImg"
              onClick={() => navigate("/profile")}
            />
          </li>
        </ul>
      </ContentWrapper>
      {showSearch && (
        <div className="searchBar">
          <ContentWrapper>
            <div className="searchInput">
              <input
                type="text"
                placeholder="Search your Products...."
                onChange={(e) => setQuery(e.target.value)}
                onKeyUp={searchQueryHandler}
              />
              <VscChromeClose onClick={() => setShowSearch(false)} />
            </div>
          </ContentWrapper>
        </div>
      )}
    </header>
  );
};

export default Header;
