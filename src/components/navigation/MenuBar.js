import React from 'react';
// import * as urls from "../cabinet/urls";
import '../../styles/cssfiles/CssFolder';
import logo from '../../resource/logo_sb.png';

const MenuBar = () => {
  const desktop = window.innerWidth > 768 ? 'desktop' : '';
  const phone = window.innerWidth <= 768 ? 'phone' : '';
  return (
    <>
      <header>
        {desktop && (
          <nav className="nav-menu">
            <ul className="nav-ul">
              <a className="logoArea" href="/">
                <img
                  className="logo"
                  src={logo}
                  alt="igre-logo"
                />
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
          <nav className="nav-menu">
            <ul className="nav-ul">
              <a className="logoArea" href="/">
                <img
                  className="logo"
                  src={logo}
                  alt="igre-logo"
                />
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
