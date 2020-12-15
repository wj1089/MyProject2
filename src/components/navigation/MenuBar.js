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
      {desktop && (
        <header>
          {/* className="nav_menu" */}
          <nav
            style={{
              position: "relative",
              display: "inline-block",
              width: "1140px",
              // textAlign: "center",
              height: "60px",
              marginTop: "40px",
              listStyle: "none",
              fontFamily: "Noto Sans KR",
              fontSize: "25px",
              fontWeight: "bold",
              fontStretch: "normal",
              fontStyle: "normal",
              lineHeight: "1.45",
              letterSpacing: "normal",
            }}
          >
            <ul>
              {/* className="logoArea" */}
              <li
                style={{
                  display: "inline-block",
                  float: "left",
                }}
              >
                {/* className="logo" */}
                <img
                  src={logo}
                  style={{
                    position: "relative",
                    width: "44px",
                    height: "auto",
                  }}
                />
              </li>

              {/* className="one" */}
              <li
                style={{
                  width: "90px",
                  display: "inline-block",
                  float: "right",
                  height: "auto",
                  margin: "12px 0 12px 2%",
                  fontSize: "17px",
                  lineHeight: "1.16",
                  fontWeight: "normal",
                  fontStretch: "normal",
                  fontFamily: "Noto Sans KR",
                  fontStyle: "normal",
                  letterSpacing: "normal",
                  textAlign: "left",
                  color: "#222222",
                }}
              >
                브랜드소개
              </li>

              {/* className="two" */}
              <li
                style={{
                  width: "90px",
                  display: "inline-block",
                  float: "right",
                  height: "auto",
                  margin: "12px 1% 12px 10px",
                  fontSize: "17px",
                  lineHeight: "1.16",
                  fontWeight: "normal",
                  fontStretch: "normal",
                  fontFamily: "Noto Sans KR",
                  fontStyle: "normal",
                  letterSpacing: "normal",
                  textAlign: "left",
                  color: "#222222",
                }}
              >
                상품소개
              </li>

              {/* onClick={()=>{history.push('/WidePage')}}
               */}
              {/* <li><a>Delivery</a></li>
                        <li><a>Comment</a></li>
                        <li><a>News</a></li> */}
              {/* className="introMunu"
                        className="productMunu" */}
            </ul>
          </nav>
        </header>
      )}
      {phone && (
        <header>
          <nav className="nav_menu">
            <ul>
              <li className="logoArea">
                <img src={logo} className="logo" />
              </li>
              <li className="one">브랜드소개</li>
              <li className="two">상품소개</li>
            </ul>
          </nav>
        </header>
      )}
    </>
  );
};

export default MenuBar;
