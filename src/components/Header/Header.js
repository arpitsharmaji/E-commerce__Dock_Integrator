import React, { useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { VscChromeClose } from "react-icons/vsc";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { AiFillShop } from "react-icons/ai";
import "./Style.scss";
import { useNavigate } from "react-router-dom";
import ContentWrapper from "../ContentWrapper/ContentWrapper";
import Avtar from "../../assets/avatar.png";
import { useSelector } from "react-redux";
import { SlMenu } from "react-icons/sl";
import { useDispatch } from "react-redux";
import { Logout } from "../../Store/UserAuth";

const Header = () => {
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);

  const searchQueryHandler = (event) => {
    if (event.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
    }
  };

  const controlNavbar = () => {
    if (window.scrollY) {
      setShowSearch(false);
      setMobileMenu(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, []);

  const openSearch = () => {
    setShowSearch(true);
    setMobileMenu(false);
  };

  const nevigateToHome = () => {
    navigate("/");
    setShowSearch(false);
    setMobileMenu(false);
  };

  const openMobileMenu = () => {
    setMobileMenu(true);
    setShowSearch(false);
  };

  const logoutHandler = () => {
    dispatch(Logout());
    navigate("/");
    setMobileMenu(false);
  };

  return (
    <header className={`header ${mobileMenu ? "mobileView" : ""}`}>
      <ContentWrapper>
        <div className="logo" onClick={nevigateToHome}>
          <AiFillShop />
          ShopBag
        </div>
        <ul className="menuItems">
          <li
            className="menuItem"
            onClick={() => [
              navigate("/products"),
              setShowSearch(false),
              setMobileMenu(false),
            ]}
          >
            Products
          </li>

          <li
            className="menuItem"
            onClick={() => [
              setMobileMenu(false),
              setShowSearch(false),
              navigate("/cart"),
            ]}
          >
            <AiOutlineShoppingCart />
          </li>
          <li className="menuItem">
            <HiOutlineSearch onClick={openSearch} />
          </li>
          {user === null ? (
            <li
              className="menuItem"
              onClick={() => [
                navigate("/login"),
                setMobileMenu(false),
                setShowSearch(false),
              ]}
            >
              LOGIN
            </li>
          ) : (
            <li className="menuItem" onClick={logoutHandler}>
              Logout
            </li>
          )}
          <li className="menuItem ProfilePicHeader ">
            <img
              src={
                user?.profilePic
                  ? `http://localhost:8080/${user?.profilePic}`
                  : Avtar
              }
              alt="profileImg"
              onClick={() => [
                navigate("/profile"),
                setShowSearch(false),
                setMobileMenu(false),
              ]}
            />
          </li>
        </ul>

        <div className="mobileMenu">
          <HiOutlineSearch onClick={openSearch} />
          <div className=" ProfilePicHeader ">
            <img
              src={
                user?.profilePic
                  ? `http://localhost:8080/${user?.profilePic}`
                  : Avtar
              }
              alt="profileImg"
              onClick={() => [
                navigate("/profile"),
                setShowSearch(false),
                setMobileMenu(false),
              ]}
            />
          </div>
          {mobileMenu ? (
            <VscChromeClose onClick={() => setMobileMenu(false)} />
          ) : (
            <SlMenu onClick={openMobileMenu} />
          )}
        </div>
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
              <VscChromeClose
                style={{ color: "#fff" }}
                onClick={() => setShowSearch(false)}
              />
            </div>
          </ContentWrapper>
        </div>
      )}
    </header>
  );
};

export default Header;
