import React, { useState, useEffect, useRef, createContext } from "react";
import axios from "axios";
import * as urls from "../cabinet/urls";

import "../../styles/cssfiles/CssFolder.js";

import MenuBar from "../navigation/MenuBar";
import Footer from "../footer/Footer";
import { Modal } from "react-bootstrap";
import HoverImage from "react-hover-image";
import Slider from "../contentCard/Slider.js";
import AyiImage from "../../resource/logo_wm.png";
import BtnRight from "../../resource/arrow_forward_ios.svg";
import phoneImg from "../../resource/phone_section1.gif";
import deliveryImg from "../../resource/phone_section2_pc.gif";
import deliveryImg_phone from "../../resource/phone_section2_mobile.png";
import footerImg from "../../resource/footer_pc.png";
import footerImgM from "../../resource/footer_mobile.png";
import greenDown from "../../resource/appdownload_pc.png";
import whiteDown from "../../resource/appdownload_pc-hover.png";
import brand from "../../resource/icon_blog_9e9e.png";

const desktop = window.innerWidth > 768 ? "desktop" : "";
const phone = window.innerWidth <= 768 ? "phone" : "";

const Landing = () => {
  const [spinIndex, setSpinIndex] = useState(0);
  const [canScroll, setCanScroll] = useState(true);
  const sectionTitle = ["Main", "Delivery", "Review", "Hotmenu", "Downintro"];
  const mainContent = useRef();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const handleShow = () => {
    setShow(true);
    setReadMore(false);
    setInputNum('');
    setCheckBox(false);

    setFinalCheck(false);
    setInputCode('');
  }

  function handleClick(e) {
    e.preventDefault();
    window.open(urls.igreLink);
  }
  function blogLink(e) {
    e.preventDefault();
    window.open(urls.igreBlog);
  }
  function instaLink(e) {
    e.preventDefault();
    window.open(urls.igreInsta);
  }


  //   main 스크롤
  useEffect(() => {
    scrollContent(spinIndex);
  }, [spinIndex]);

  useEffect(() => {
    setTimeout(function () {
      setCanScroll(true);
    }, 100);
  }, [canScroll]);

  const wheel = (e) => {
    if (canScroll) {
      setCanScroll(false);
      if (e.deltaY > 0) {
        // scroll down
        if (spinIndex < sectionTitle.length - 1) setSpinIndex(spinIndex + 1);
      } else {
        // scroll up
        if (spinIndex > 0) setSpinIndex(spinIndex - 1);
      }
    }
  };

  function scrollContent(count) {
    const vh = mainContent.current.clientHeight;
    let movepix = vh * count;
    mainContent.current.setAttribute(
      "style",
      "-webkit-transform: translateY(-" +
        movepix +
        "px);\
            -ms-transform: translateY(-" +
        movepix +
        "px);\
            -o-transform: translateY(-" +
        movepix +
        "px);\
            transform: translateY(-" +
        movepix +
        "px);\
            "
    );
  }
  //Review axios, API 연결
  const [reviewItem, setReviewItem] = useState([]);
  useEffect(() => {
    axios
    .get(urls.reviewList)
    .then((res) => {
      if (res && res.data.code === "1") {
        const parseJson = JSON.parse(res.data.msg);
        const aaaa = parseJson.item;
        let RevArr = [];
        aaaa.map((item) =>
        RevArr.push({
          id: item.id,
          img: item.product.thumnail,
          content: makeReviewElement(item.product.name, item.point, item.description)
        })
        );
        setReviewItem(RevArr);
        
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  function makeReviewElement(name, point, description) {
    return (
      <div className="RV_downArea">
        <div className="RV_contentName">{name}</div>
        <div className="RV_iconArea">
          <span className="material-icons">favorite</span> {point}
        </div>
        <div className="RV_slideText">
          <p className="RV_contentDescrip">{description}</p>
        </div>
      </div>
    );
  }

  //HotTrack axios, API연결
  const [productItem, setProductItem] = useState([]);
  useEffect(() => {
    axios
      .get(urls.hotTrackList)
      .then((response) => {
        if (response && response.data.code === "1") {
          const parseJson = JSON.parse(response.data.msg);
          const bbbb = parseJson[0].products;
          let hotTrackArr = [];
          bbbb.map((product) =>
            hotTrackArr.push({
              id: product.prodectId,
              img: product.thumnail,
              content: makeHotTrackElement(product.name, product.description),
            })
          );
          setProductItem(hotTrackArr);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function makeHotTrackElement(name, description) {
    return (
      <>
        <div className="HT_contentText">
          <p className="HT_contentName">{name}</p>
          <p className="HT_contentDescrip">{description}</p>
        </div>
      </>
    );
  }


  //슬라이드 이동(상하)
  let start = 0;
  const touchStart = (e) => {
    e.stopPropagation();
    start = e.touches[0];
  };

  const touchFinish = (e) => {
    setCanScroll(false);
    e.stopPropagation();

    if (canScroll) {
      if (start.clientY > e.changedTouches[0].clientY) {
        if (spinIndex < sectionTitle.length - 1) setSpinIndex(spinIndex + 1);
      } else if (start.clientY === e.changedTouches[0].clientY) {
        if (spinIndex === 0) setSpinIndex(0);
      } else {
        if (spinIndex > 0) setSpinIndex(spinIndex - 1);
      }
    }
  };

// 모달 (web)
  const [inputNum, setInputNum] = useState("");
  const [checkBox, setCheckBox] = useState(false);
  const [finalCheck, setFinalCheck] = useState(false);
  const [authId, setAuthId] = useState("")
  const [inputCode, setInputCode] =useState("")

  const onChange = (e) => {
    setInputNum(e.target.value);
  };
  const codeNum = (e) =>{
    setInputCode(e.target.value)
  }
  
  const checkYn = () => {
    setCheckBox(!checkBox);
  };


  function phoneHandle() {
    if (checkBox === false) {
      alert("개인정보수집을 위해 체크박스를 눌러주세요");
      setFinalCheck(false);
      return;
    }
   
    axios
      .get(urls.sendNum + inputNum) 
      .then((response) => {
        console.log(response)
        if (response && response.data.code === "1") {
          const parseJson = JSON.parse(response.data.msg);
          const authId = parseJson.authId;
          setAuthId(authId);
          setFinalCheck(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }


 // finalCheck가 중복
 // 유효성 검사를 위한 관리(미입력, 자릿수6자리 여부확인)

  function checkHandle(){
    axios
    .post(urls.checkPhone,{authId : authId, code :inputCode })
    .then((response)=>{
        console.log(response)
        if(response && response.data.code === "1"){
          handleClose()
        }
      })
      .catch((error)=>{
        console.log(error)
      });
    }
//성공

    

  // 모달 보기, 접기 버튼
  const [readMore, setReadMore] = useState(false);

  const extraContent = (
    <div className="extra-area">
      <p className="extra-content">
        - SMS 발송 및 부정이용 방지용으로 핸드폰 번호를 수집하며
        <br />
        목적 달성 1일 후 파기할 예정입니다.
        <br />- 한개의 휴대폰 번호로 하루 최대 3번까지 전송 가능합니다.
      </p>
    </div>
  );

  const moreName = readMore ? "접기" : "보기"; 

 // 모달 조건 변경
  function conditionCheck() {
    return (
      <>
        <div className="modal-CAfirstLine">
          <input type="checkbox" className="modal-checkBox" onClick={checkYn} />
          <p className="modal-CBtext">개인정보 수집/이용에 동의합니다.</p>
          <div
            className="modal-CBtext2"
            onClick={() => {
              setReadMore(!readMore);
            }}
          >
            <a> [{moreName}] </a>
          </div>
        </div>
        {readMore && extraContent}
        <div className="footer">
          <button className="modal_btn" onClick={phoneHandle}>
            <p className="btnWord">인증번호 발송</p>
          </button> 
        </div>
        
      </>
    );
  }
  
  function condiChange(){
    return(
      <>
        <div className="modal-CAfirstLine">
          <input className="modal-input" 
          onChange={codeNum}
          value={inputCode}
          />
        </div>
        <div className="footer">
          <div className="modal_timer">{Timer}</div>
          <button className="modal_btn" onClick={checkHandle}>
            <p className="btnWord">전화번호 인증</p>
          </button> 
        </div>
      </>
    )
  }

  
  const [minutes, setMinutes] = useState(3);
  const [seconds, setSeconds] = useState(0);

  function Timer () {
    return (
      <>
        {minutes} : {seconds < 10 ? `0${seconds}` : seconds}
      </>
    )
  }

  useEffect(() => {
    const countdown = setTimeout(() => {
      if (parseInt(seconds) > 0) {
        setSeconds(parseInt(seconds) - 1);
      }
      if (parseInt(seconds) === 0) {
        if (parseInt(minutes) === 0) {
          clearInterval(countdown);
        } else {
          setMinutes(parseInt(minutes) - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    
    return () => clearInterval(countdown);
  }, [minutes, seconds]);
  





  return (
    <main className="full_screen">
      {/* 상단메뉴바 */}
      <MenuBar />

      <div
        className="main_content"
        onTouchStart={touchStart}
        onTouchEnd={touchFinish}
        onWheel={wheel}
        ref={mainContent}
      >
        {/* 첫번째 페이지 */}
        <section className="fbp main" data-title="Main">
          {desktop && (
            <>
              <div className="outSide_Image">
                <div className="section_container_1">
                  <div className="firstPage_thumnail">
                    <img
                      className="ayi_img"
                      src={AyiImage}
                      alt="아이그레mainLogo"
                    />
                    <p className="font2">
                      어린이 식품 <br />
                      정기배송 서비스
                    </p>
                    <button
                      className="section_link_1"
                      onClick={handleShow}
                    >
                      <p className="link1_text">앱 다운로드</p>
                    </button>
                  </div>

                  <div className="inSide_Img">
                    <img
                      className="main_phnGif"
                      src={phoneImg}
                      alt="아이그레infoSlide"
                    />
                  </div>
                </div>
              </div>
              <div className="mouseDown">
                <i className="fas fa-mouse" />
                <i className="fas fa-angle-double-down" />
              </div>
            </>
          )}

          {phone && (
            <div className="outSide_Image">
              <div className="section_container_1">
                <div className="firstPage_thumnail">
                  <img
                    className="ayi_img"
                    src={AyiImage}
                    alt="아이그레mainLogo"
                  />
                  <p className="font2">
                    어린이 식품 <br />
                    정기배송 서비스
                  </p>
                  <button className="section_link_1" onClick={handleClick}>
                    <p className="link1_text">앱 다운로드</p>
                  </button>
                </div>

                <div className="inSide_Img">
                  <img
                    className="main_phnGif"
                    src={phoneImg}
                    alt="아이그레infoSlide"
                  />
                </div>
              </div>
            </div>
          )}
        </section>

        {/* <두번째 페이지> */}
        <section className="fbp delivery" data-title="Delivery">
          <div className="outSide_Image_2">
            <div className="section_container_2">
              <span className="secondPage_thumnail">
                <p className="firstWords_2">다양한 상품을</p>
                <p className="secondWords_2">편리한 정기배송으로</p>
                <p className="thirdWords_2">
                  매달 새로운 구성의 정기배송 박스를 <br />
                  기존 대비 합리적인 비용으로 <br />
                  만나보실 수 있습니다.
                </p>
              </span>

              {desktop && (
                <span className="inSide_Img2">
                  <img
                    src={deliveryImg}
                    className="delivery_phnGif"
                    alt="아이그레gifImage-1"
                  />
                </span>
              )}

              {phone && (
                <span className="inSide_Img2">
                  <img
                    className="delivery_phnGif"
                    src={deliveryImg_phone}
                    alt="아이그레gifImage-1"
                  />
                </span>
              )}
            </div>
          </div>
        </section>

        {/* 세번째 페이지 */}
        <section className="review" data-title="Review">
          {desktop && (
            <>
              <div className="outSide_Image_3" />
              <div className="section_container_3">
                <div className="thirdPage_thumnail">
                  <div className="thumnailContent_3">
                    <div className="firstWords_3">
                      <div className="fas fa-hashtag" />
                      <img
                        className="ayi_img2"
                        src={AyiImage}
                        alt="아이그레mainLogo-2"
                      />
                    </div>
                    <p className="secondWords_3">고객후기</p>
                    <p className="thirdWords_3">
                      정기배송을 경험한 <br />
                      고객님들의 후기를 <br />
                      확인해보세요.
                    </p>
                  </div>
                </div>

                <div className="RV_SlideWrapper">
                  <Slider
                    data={reviewItem}
                    containerCss={"SliderContainer"}
                    itemCss={"inSide_slide"}
                    contentCss={"RV_slideImgArea"}
                    imgCss={"RV_imgSize"}
                    onClickEvent={handleShow}
                  />
                </div>
              </div>
            </>
          )}

          {phone && (
            <div className="outSide_Image_3">
              <div className="section_container_3">
                <div className="thirdPage_thumnail">
                  <div className="font1">
                    <p className="fas fa-hashtag"></p>
                    <p className="font1-2">고객후기</p>
                  </div>
                </div>

                <div className="RV_SlideWrapper">
                  <Slider
                    data={reviewItem}
                    containerCss={"SliderContainer"}
                    itemCss={"inSide_slide"}
                    contentCss={"RV_slideImgArea"}
                    imgCss={"RV_imgSize"}
                    onClickEvent={handleShow}
                  />
                </div>
              </div>
            </div>
          )}
        </section>

        {/* 네번째 페이지 */}
        <section className="hotmenu" data-title="Hotmenu">
          {desktop && (
            <>
              <div className="outSide_Image_4" />
              <div className="section_container_4">
                <div className="fourthPage_thumnail">
                  <div className="thumnailContent_4">
                    <div className="firstWords_4">
                      <div className="fas fa-hashtag" />
                      <img
                        className="ayi_img2"
                        src={AyiImage}
                        alt="아이그레mainLogo-2"
                      />
                    </div>
                    <p className="secondWords_4">인기상품</p>
                    <p className="thirdWords_4">
                      아이그레가 자신있게
                      <br />
                      추천드리는 상품입니다
                    </p>

                    <button className="moreBtn" onClick={handleShow}> 더보기</button>
                    
                  </div>
                </div>

                <div className="HT_SlideWrapper">
                  <Slider
                    data={productItem}
                    containerCss={"SliderContainer"}
                    itemCss={"HT_sectionimgs"}
                    contentCss={"HT_cardArea"}
                    imgCss={"HT_imgSize"}
                    onClickEvent={handleShow}
                  />
                </div>
              </div>
            </>
          )}

          {phone && (
            <>
              <div className="outSide_Image_4" />
              <div className="section_container_4">
                <div className="fourthPage_thumnail">
                  <div className="fourth_font1">
                    <p className="fas fa-hashtag" />
                    <p className="font3">
                      인기상품
                      <img
                        src={BtnRight}
                        className="moreBtn_mobile"
                        onClick={handleClick}
                      />
                    </p>
                  </div>
                  <p className="font2">
                    아이그레가 자신있게
                    <br />
                    추천드리는 상품입니다.
                  </p>
                </div>

                <div className="HT_SlideWrapper">
                  <Slider
                    data={productItem}
                    containerCss={"HT_SliderList"}
                    itemCss={"HT_sectionimgs"}
                    contentCss={"HT_cardArea"}
                    imgCss={"HT_imgSize"}
                    onClickEvent={handleShow}
                  />
                </div>
              </div>
            </>
          )}
        </section>

        {/* 다섯번째 페이지 */}
        <section className="fbp downintro" data-title="Downintro">
          <div className="outSide_Image_5">
            <div className="section_container_5">
              <div className="fifthPage_thumnail">
                <div className="thumNailContent_5">
                  <img
                    className="ayi_img3"
                    src={AyiImage}
                    alt="아이그레mainLogo3"
                  />
                  <p className="secondWords_5">
                    앱을 다운받으시고
                    <br />
                    편리한 정기배송 서비스를
                    <br />
                    이용해보세요 <br />
                  </p>

                  <button
                    className="section_link_5"
                    data-toggle="modal"
                    onClick={handleShow}
                  >
                    <p className="link5_text">앱 다운로드</p>
                  </button>
                </div>
              </div>

              <div className="inSide_Img5_area">
                {desktop && (
                  <img
                    className="inSide_Img_5"
                    src={footerImg}
                    alt="아이그레PCLogo2"
                  />
                )}
                {phone && (
                  <img
                    className="inSide_Img_5"
                    src={footerImgM}
                    alt="아이그레MobileLogo2"
                  />
                )}
              </div>
            </div>
            <div className="linkSite">
              <a
                className="fab fa-instagram"
                onClick={instaLink}
                style={{ textDecoration: "none", outline: "none" }}
              />
              <img className="brand" src={brand} onClick={blogLink} />
            </div>
            <Footer/>
          </div>
        </section>
      </div>

      {desktop && (
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
          role="dialog"
          aria-modal="true"
          trbindex="-1"
          className="efef"
        >
          <Modal.Header className="header" closeButton />

          <Modal.Body className="body">
            <div className="modal-text">
              <img
                className="modal_logo"
                src={AyiImage}
                alt="아이그레Modal_LogoImg"
              />
              <p className="modal-textP"> , 더 간편하게 앱으로 만나보세요!</p>
            </div>
            <p className="modal-text2">앱 설치주소 메시지로 받기</p>
            <input
              type="tel"
              className="modal-input"
              placeholder="   핸드폰 번호입력  ( - 제외 )"
              // pattern="[0-9]{2,3}-[0-9]{3,4}-[0-9]{3,4}"
              onChange={onChange}
              value={inputNum}
            />
            <br />

            <div className="modal-changeArea">              
              {finalCheck ? condiChange() : conditionCheck()}              
            </div>

          </Modal.Body>
        </Modal>
      )}
      {phone && (
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
          role="dialog"
          aria-modal="true"
          trbindex="-1"
          className="efef"
        >
          <Modal.Header className="header" closeButton />

          <Modal.Body className="body">
            <p className="modal-text">
              더 많은 정보가 궁금하시다면 <br />
              <img
                className="modal_logo"
                src={AyiImage}
                alt="아이그레Modal_LogoImg"
              />
              , 더 간편하게 앱으로 만나보세요!
            </p>
            <br />

            <button className="modal_btn" onClick={handleClick}>
              <p className="material-icons">save_alt</p>
              <p className="btnWord">앱 다운로드</p>
            </button>
          </Modal.Body>
        </Modal>
      )}

      {spinIndex > 0 && spinIndex < 4 && (
        <div className="linkArea">
          <HoverImage
            className="section_link"
            onClick={handleShow}
            src={greenDown}
            hoverSrc={whiteDown}
            alt="아이그레다운이미지"
          />
          <div className="mouseDown2">
            <i className="fas fa-angle-double-down" />
          </div>
        </div>
      )}
    </main>
  );
};

export default Landing;
