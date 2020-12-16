import React from "react";
import "../navigation/Navigation.css";
import logo from "../../resource/logo_sb.png";
import { useHistory } from "react-router-dom";

const desktop = window.innerWidth > 768 ? "desktop" : "";
const phone = window.innerWidth <= 768 ? "phone" : "";

const MenuBar = () => {
  const history = useHistory();

  return (
    <>
        <header>
      {desktop && (
          <nav className="nav_menu">
            <ul className="nav_ul">
              <li className="logoArea">
                <img className="logo"
                  src={logo}
                />
              </li>
              <span className="contentArea">
                {/* <li className="one">
                  브랜드소개
                </li>

                <li className="two">
                  상품소개
                </li> */}
              </span>
            </ul>
          </nav>
      )}

      {phone && (
          <nav className="nav_menu">
            <ul className="nav_ul">
              <li className="logoArea">
                <img src={logo} className="logo" />
              </li>
              {/* <li className="one">브랜드소개</li>
              <li className="two">상품소개</li> */}
            </ul>
          </nav>
      )}
      </header>
    </>
  );
};

export default MenuBar;
