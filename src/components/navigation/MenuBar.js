import React from "react";
// import * as urls from "../cabinet/urls";
import "../../styles/cssfiles/CssFolder.js"
import logo from "../../resource/logo_sb.png";

const desktop = window.innerWidth > 768 ? "desktop" : "";
const phone = window.innerWidth <= 768 ? "phone" : "";
const MenuBar = () => {

  return (
    <>
        <header>
      {desktop && (
          <nav className="nav_menu">
            <ul className="nav_ul">
              <a className="logoArea" href="/">
                  <img className="logo" src={logo} alt="igre_logo"/>
              </a>
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
              <a className="logoArea" href="/">
                  <img className="logo" src={logo} alt="igre_logo"/>
              </a>
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
