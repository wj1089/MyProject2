import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Modal } from 'react-bootstrap';
import HoverImage from 'react-hover-image';
import * as urls from '../cabinet/urls';
import '../../styles/cssfiles/CssFolder';

import MenuBar from '../navigation/MenuBar';
import Footer from '../footer/Footer';

import Slider from '../contentCard/Slider';
import StarPoint from '../contentCard/StarPoint';

import AyiImage from '../../resource/logo_wm.png';
import BtnRight from '../../resource/arrow_forward_ios.svg';
import phoneImg from '../../resource/phone_section1.gif';
import deliveryImg from '../../resource/phone_section2_pc.gif';
import deliveryImgPhone from '../../resource/phone_section2_mobile.png';
import footerImg from '../../resource/footer_pc.png';
import footerImgM from '../../resource/footer_mobile.png';
import greenDown from '../../resource/appdownload_pc.png';
import whiteDown from '../../resource/appdownload_pc-hover.png';
import brand from '../../resource/icon_blog_9e9e.png';

const desktop = window.innerWidth > 768 ? 'desktop' : '';
const phone = window.innerWidth <= 768 ? 'phone' : '';
const Landing = () => {
  // useState
  // section별 이름
  const sectionTitle = ['Main', 'Delivery', 'Review', 'Hotmenu', 'Downintro'];
  const mainContent = useRef();
  const [canScroll, setCanScroll] = useState(true);
  const [spinIndex, setSpinIndex] = useState(0);

  // Modal 개인 인증**

  // 보여지는 show 공간 관리
  const [show, setShow] = useState(false);
  // >>보기 & 접기
  const [readMore, setReadMore] = useState(false);
  const moreName = readMore ? '접기' : '보기';
  // >>번호입력란
  const [inptNum, setInptNum] = useState('');
  // >>체크박스
  const [checkBxAgree, setCheckBxAgree] = useState(false);
  // >>인증번호확인후 최종전달
  const [finalCheck, setFinalCheck] = useState(false);
  // >>수신인증번호입력
  const [inptCodeNum, setInptCodeNum] = useState('');
  // >>수신인증번호
  const [inptAuthId, setInputAuthId] = useState('');

  // 상품 & 리뷰 슬라이드 **
  // Review & HotTrack 버튼, 슬라이드 분리용 클릭버튼 공간
  const [btnClickEvent, setBtnClickEvent] = useState({});
  // Review Api로 부터 가져온 Item항목 공간
  const [reviewItem, setReviewItem] = useState([]);
  // HotTrack Api로 부터 가져온 Item항목 공간
  const [productItem, setProductItem] = useState([]);
  // 시간 타이머를 위한 minutes,seconds
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  // 슬라이드 이동(시작점)
  let start = 0;

  // Close관리
  const handleClose = () => {
    setShow(false);
  };
  // 보여지는 Show관리
  const handleShow = () => {
    setShow(true);
    setReadMore(false);
    setInptNum('');
    setCheckBxAgree(false);
    setFinalCheck(false);
    setInptCodeNum('');
  };

  // input내용 변경 관리
  const inptChange = (e) => {
    setInptNum(e.target.value);
  };
  // 수신받은 CodeNumber의 Input 관리
  const inptCodeChange = (e) => {
    setInptCodeNum(e.target.value);
  };
  // 체크박스의 유무 관리
  const handleCheckYn = () => {
    setCheckBxAgree(!checkBxAgree);
  };
  // 접기 펴기 버튼
  const handleReadMore = () => {
    setReadMore(!readMore);
  };

  // main 스크롤
  const wheel = (e) => {
    if (canScroll) {
      setCanScroll(false);
      if (e.deltaY > 0) {
        if (spinIndex < sectionTitle.length - 1) setSpinIndex(spinIndex + 1);
      } else if (spinIndex > 0) setSpinIndex(spinIndex - 1);
    }
  };

  // Scroll 움직이는 범위 단위
  function scrollContent(count) {
    const vh = mainContent.current.clientHeight;
    const movepix = vh * count;

    let styleMoveRate = `-webkit-transform: translateY(-${movepix}px);`;
    styleMoveRate += `-ms-transform: translateY(-${movepix}px);`;
    styleMoveRate += `-o-transform: translateY(-${movepix}px);`;
    styleMoveRate += `transform: translateY(-${movepix}px);`;
    mainContent.current.setAttribute(
      'style',
      styleMoveRate,
    );
  }

  // 슬라이드 이동(시작점)
  const touchStart = (e) => {
    e.stopPropagation();
    start = e.touches['0'];
  };

  // 슬라이드 이동(끝난점)
  const touchFinish = (e) => {
    setCanScroll(false);
    e.stopPropagation();

    if (canScroll) {
      if (start.clientY > e.changedTouches[0].clientY) {
        if (spinIndex < sectionTitle.length - 1) setSpinIndex(spinIndex + 1);
      } else if (start.clientY === e.changedTouches[0].clientY) {
        if (spinIndex === 0) setSpinIndex(0);
      } else if (spinIndex > 0) setSpinIndex(spinIndex - 1);
      // 수정 사항
    }
  };
  // 모달 첫번째 입력동작 관리(체크박스를 눌러야 동작)
  function handleAgreeCheck() {
    if (checkBxAgree === false) {
      setFinalCheck(false);
      return;
    }
    axios
      .get(urls.sendNum + inptNum)
      .then((response) => {
        if (response && response.data.code === '1') {
          const parseJson = JSON.parse(response.data.msg);
          const jsonAuthId = parseJson.authId;
          setInputAuthId(jsonAuthId);
          setFinalCheck(true);
          setMinutes(3);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // 폰에 입력받은 코드를 최종적으로 확인하는 동작과정
  function handleCFcode() {
    if (inptCodeNum.length !== 6) {
      alert('정확한 인증번호를 입력해주세요.');
      return;
    }
    if (minutes === 0 && seconds === 0) {
      alert('입력시간이 초과되었습니다, 다시 입력해주세요.');
      return;
    }
    axios
      .post(urls.checkPhone, { authId: inptAuthId, code: inptCodeNum })
      .then((response) => {
        if (response && response.data.code === '1') {
          handleClose();
        } else {
          alert(response.data.msg);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  // 모달 보기, 접기 버튼
  const extraContent = (
    <p className="extra-content">
      - SMS 발송 및 부정이용 방지용으로 핸드폰 번호를 수집하며
      <br />
      목적 달성 1일 후 파기할 예정입니다.
      <br />- 한개의 휴대폰 번호로 하루 최대 3번까지 전송 가능합니다.
    </p>
  );

  // ReviewItem에 필요한 name, S, description Element자료
  function makeReviewElement(name, point, description) {
    return (
      <>
        <div className="rv-downArea">
          <div className="rv-contentName">{name}</div>

          <StarPoint point={point} />
          <div className="rv-slideText">
            <p className="rv-contentDescrip">{description}</p>
          </div>
        </div>
      </>
    );
  }

  // HotTrack item.content안 내용을 전달하기위한 Element
  function makeHotTrackElement(name, description) {
    return (
      <>
        <div className="ht-contentText">
          <p className="ht-contentName">{name}</p>
          <p className="ht-contentDescrip">{description}</p>
        </div>
      </>
    );
  }

  // 모달 조건 변경(팝업 첫번째 내용)
  function makeAgreeElement() {
    return (
      <>
        <div className="modal-CAfirstLine">
          <input
            type="checkbox"
            className="modal-checkBox"
            onClick={handleCheckYn}
          />
          <p className="modal-CBtext">개인정보 수집/이용에 동의합니다.</p>
          <div
            className="modal-CBtext2"
            onClick={handleReadMore} // 수정 사항
            aria-hidden="true"
          >
            <p>[{moreName}]</p>
          </div>
        </div>

        {moreName === '보기' && (
          <>
            <div className="space" style={{ height: 80 }} />
            <div className="footer">
              {checkBxAgree === false && (
                <button
                  type="button"
                  className="modal-btn"
                  style={{ backgroundColor: '#cccccc' }}
                >
                  <p className="btnWord">인증번호 발송</p>
                </button>
              )}
              {checkBxAgree === true && (
                <button
                  type="button"
                  className="modal-btn"
                  onClick={handleAgreeCheck}
                >
                  <p className="btnWord">인증번호 발송</p>
                </button>
              )}
            </div>
          </>
        )}

        {moreName === '접기' && (
          <>
            <div style={{ height: 80, alignContent: 'center' }}>
              {extraContent}
            </div>

            <div className="footer">
              {checkBxAgree === false && (
                <button
                  type="button"
                  className="modal-btn"
                  style={{ backgroundColor: '#cccccc' }}
                >
                  <p className="btnWord">인증번호 발송</p>
                </button>
              )}
              {checkBxAgree === true && (
                <button
                  type="button"
                  className="modal-btn"
                  onClick={handleAgreeCheck}
                >
                  <p className="btnWord">인증번호 발송</p>
                </button>
              )}
            </div>
          </>
        )}
      </>
    );
  }

  // 모달 조건 변경(팝업 두번째 내용)
  function makeCertificElement() {
    return (
      <>
        <div className="modal-CAfirstLine">
          <input
            className="modal-input"
            onChange={inptCodeChange}
            value={inptCodeNum}
          />
        </div>
        <div className="footer">
          <div className="modal-timer">
            인증번호가 발송되었습니다 (남은 시간 :{minutes}:
            {seconds < 10 ? `0${seconds}` : seconds})
          </div>

          {inptCodeNum.length !== 6 && (
            <button
              type="button"
              className="modal-btn"
              style={{ backgroundColor: '#cccccc' }}
            >
              <p className="btnWord">전화번호 인증</p>
            </button>
          )}

          {inptCodeNum.length === 6 && (
            <button type="button" className="modal-btn" onClick={handleCFcode}>
              <p className="btnWord">전화번호 인증</p>
            </button>
          )}
        </div>
      </>
    );
  }

  // Review & HotTrack 버튼, 슬라이드 분리용 클릭버튼 동작
  const sliderExtraBtn = (e) => {
    let value = Number(e.target.dataset.title);
    if (btnClickEvent[e.target.name] !== undefined) {
      let veiwValue = value + btnClickEvent[e.target.name];
      if (value > 0 && veiwValue < 0) veiwValue = 1;
      if (value < 0 && veiwValue > 0) veiwValue = -1;
      if (veiwValue === 0) veiwValue = value;
      value = veiwValue;
    }

    setBtnClickEvent((btnClick) => ({
      ...btnClick,
      [e.target.name]: value,
    }));
  };

  // Igre링크 관리
  function igreLink(e) {
    e.preventDefault();
    window.open(urls.igreLink);
  }
  // Blog링크 관리
  function blogLink(e) {
    e.preventDefault();
    window.open(urls.igreBlog);
  }
  // Insta링크 관리
  function instaLink(e) {
    e.preventDefault();
    window.open(urls.igreInsta);
  }

  // UseEffect

  // Scroll
  useEffect(() => {
    setTimeout(() => {
      setCanScroll(true);
    }, 100);
  }, [canScroll]);

  // Scroll(spin)
  useEffect(() => {
    scrollContent(spinIndex);
  }, [spinIndex]);

  // Review axios, API연결
  useEffect(() => {
    axios
      .get(urls.reviewList)
      .then((res) => {
        if (res && res.data.code === '1') {
          const parseJson = JSON.parse(res.data.msg);
          const jsonItem = parseJson.item;
          const reviewArr = [];
          jsonItem.map((item) => reviewArr.push({
            id: item.id,
            img: item.product.thumnail,
            content: makeReviewElement(
              item.product.name,
              item.point,
              item.description,
            ),
          }));
          setReviewItem(reviewArr);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // HotTrack axios, API연결
  useEffect(() => {
    axios
      .get(urls.hotTrackList)
      .then((response) => {
        if (response && response.data.code === '1') {
          const parseJson = JSON.parse(response.data.msg);
          const jsonProject = parseJson[0].products;
          const hotTrackArr = [];
          jsonProject.map((product) => hotTrackArr.push({
            id: product.prodectId,
            img: product.thumnail,
            content: makeHotTrackElement(product.name, product.description),
          }));
          setProductItem(hotTrackArr);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // 타이머 카운트다운
  useEffect(() => {
    const countdown = setInterval(() => {
      if (Number(seconds) > 0) {
        setSeconds(Number(seconds) - 1);
      }
      if (Number(seconds) === 0) {
        if (Number(minutes) === 0) {
          clearInterval(countdown);
        } else {
          setMinutes(Number(minutes) - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => clearInterval(countdown);
  }, [minutes, seconds]);

  return (
    <main className="full-screen">
      <div className="center-area">
        {/* 상단메뉴바 */}
        <MenuBar />

        <div
          className="main-content"
          onTouchStart={touchStart}
          onTouchEnd={touchFinish}
          onWheel={wheel}
          ref={mainContent}
        >
          {/* 첫번째 페이지 */}
          <section className="fbp main" data-title="Main">
            {desktop && (
              <>
                <div className="outSide-image">
                  <div className="section-container-1">
                    <div className="firstPage-thumnail">
                      <img
                        className="ayi-img"
                        src={AyiImage}
                        alt="아이그레mainLogo"
                      />
                      <p className="font2">
                        어린이 식품 <br />
                        정기배송 서비스
                      </p>
                      <button
                        type="button"
                        className="section-link-1"
                        onClick={handleShow}
                      >
                        <p className="link1-text">앱 다운로드</p>
                      </button>
                    </div>

                    <div className="inSide-img">
                      <img
                        className="main-phnGif"
                        src={phoneImg}
                        alt="아이그레infoSlide"
                      />
                    </div>
                  </div>
                </div>
              </>
            )}

            {phone && (
              <div className="outSide-image">
                <div className="section-container-1">
                  <div className="firstPage-thumnail">
                    <img
                      className="ayi-img"
                      src={AyiImage}
                      alt="아이그레mainLogo"
                    />
                    <p className="font2">
                      어린이 식품
                      <br />
                      정기배송 서비스
                    </p>
                    <button
                      type="button"
                      className="section-link-1"
                      onClick={igreLink}
                    >
                      <p className="link1-text">앱 다운로드</p>
                    </button>
                  </div>

                  <div className="inSide-img">
                    <img
                      className="main-phnGif"
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
            <div className="outSide-image-2">
              <div className="section-container-2">
                <span className="secondPage-thumnail">
                  <p className="firstWords-2">다양한 상품을</p>
                  <p className="secondWords-2">편리한 정기배송으로</p>
                  <p className="thirdWords-2">
                    매달 새로운 구성의 정기배송 박스를
                    <br />
                    기존 대비 합리적인 비용으로
                    <br />
                    만나보실 수 있습니다.
                  </p>
                </span>

                {desktop && (
                  <span className="inSide-img2">
                    <img
                      src={deliveryImg}
                      className="delivery-phnGif"
                      alt="아이그레gifImage-1"
                    />
                  </span>
                )}

                {phone && (
                  <span className="inSide-img2">
                    <img
                      className="delivery-phnGif"
                      src={deliveryImgPhone}
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
                <div className="outSide-image-3" />
                <div className="section-container-3">
                  <div className="thirdPage-thumnail">
                    <div className="thumnailContent-3">
                      <div className="firstWords-3">
                        <div className="fas fa-hashtag" />
                        <img
                          className="ayi-img2"
                          src={AyiImage}
                          alt="아이그레mainLogo-2"
                        />
                      </div>
                      <p className="secondWords-3">고객후기</p>
                      <p className="thirdWords-3">
                        아이그레 서비스를 경험한
                        <br />
                        고객님들의 후기를
                        <br />
                        확인해보세요.
                      </p>

                      <div className="buttonArea">
                        <form className="clickBtn-L">
                          <button
                            type="button"
                            className="material-icons"
                            name="rv_btnevent"
                            data-title="1"
                            onClick={sliderExtraBtn}
                            aria-hidden="true"
                          >
                            arrow_back_ios
                          </button>
                        </form>
                        <form className="clickBtn-R">
                          <button
                            type="button"
                            className="material-icons"
                            name="rv_btnevent"
                            data-title="-1"
                            onClick={sliderExtraBtn}
                            aria-hidden="true"
                          >
                            arrow_forward_ios
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>

                  <div className="rv-slideWrapper">
                    <Slider
                      data={reviewItem}
                      containerCss="rv-sliderContainer"
                      itemCss="inSide-slide"
                      contentCss="rv-slideImgArea"
                      imgCss="rv-imgSize"
                      onClickEvent={handleShow}
                      viewButton={false}
                      onMoveEvent={btnClickEvent.rv_btnevent}
                    />
                  </div>
                </div>
              </>
            )}

            {phone && (
              <div className="outSide-image-3">
                <div className="section-container-3">
                  <div className="thirdPage-thumnail">
                    <div className="font1">
                      <p className="fas fa-hashtag" />
                      <p className="font1-2">고객후기</p>
                    </div>
                  </div>

                  <div className="rv-slideWrapper">
                    <Slider
                      data={reviewItem}
                      containerCss="rv-sliderContainer"
                      itemCss="inSide-slide"
                      contentCss="rv-slideImgArea"
                      imgCss="rv-imgSize"
                      onClickEvent={handleShow}
                      viewButton={false}
                      enableTouch={false}
                      autoSlide="true"
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
                <div className="outSide-image-4" />
                <div className="section-container-4">
                  <div className="fourthPage-thumnail">
                    <div className="thumnailContent-4">
                      <div className="firstWords-4">
                        <div className="fas fa-hashtag" />
                        <img
                          className="ayi-img2"
                          src={AyiImage}
                          alt="아이그레mainLogo-2"
                        />
                      </div>
                      <p className="secondWords-4">인기상품</p>
                      <p className="thirdWords-4">
                        아이그레가 자신있게
                        <br />
                        추천드리는 상품입니다
                      </p>

                      <div className="buttonArea">
                        <form type="button" className="clickBtn-L">
                          <button
                            type="button"
                            className="material-icons"
                            name="ht_btnevent"
                            data-title="1"
                            onClick={sliderExtraBtn}
                            aria-hidden="true"
                          >
                            arrow_back_ios
                          </button>
                        </form>

                        <form type="button" className="clickBtn-R">
                          <button
                            type="button"
                            className="material-icons"
                            name="ht_btnevent"
                            data-title="-1"
                            onClick={sliderExtraBtn}
                            aria-hidden="true"
                          >
                            arrow_forward_ios
                          </button>
                        </form>
                      </div>
                      {/* <button className="moreBtn" onClick={handleShow}>
                                  {" "}
                                  더보기
                          </button> */}
                    </div>
                  </div>

                  <div className="ht-slideWrapper">
                    <Slider
                      data={productItem}
                      containerCss="rv-sliderContainer"
                      itemCss="ht-sectionimgs"
                      contentCss="ht-cardArea"
                      imgCss="ht-imgSize"
                      onClickEvent={handleShow}
                      viewButton={false}
                      onMoveEvent={btnClickEvent.ht_btnevent}
                    />
                  </div>
                </div>
              </>
            )}

            {phone && (
              <>
                <div className="outSide-image-4" />
                <div className="section-container-4">
                  <div className="fourthPage-thumnail">
                    <div className="fourth-font1">
                      <p className="fas fa-hashtag" />
                      <p className="font3">
                        인기상품
                        <img
                          src={BtnRight}
                          className="moreBtn-mobile"
                          onClick={handleShow}
                          alt="igre-linkToMore"
                          aria-hidden="true"
                        />
                      </p>
                    </div>
                    <p className="font2">
                      아이그레가 자신있게
                      <br />
                      추천드리는 상품입니다.
                    </p>
                  </div>

                  <div className="ht-slideWrapper">
                    <Slider
                      data={productItem}
                      containerCss="ht-sliderList"
                      itemCss="ht-sectionimgs"
                      contentCss="ht-cardArea"
                      imgCss="ht-imgSize"
                      onClickEvent={handleShow}
                      viewButton={false}
                      enableTouch={false}
                      autoSlide="true"
                    />
                  </div>
                </div>
              </>
            )}
          </section>

          {/* 다섯번째 페이지 */}
          <section className="fbp downintro" data-title="Downintro">
            <div className="outSide-image-5">
              <div className="section-container-5">
                <div className="fifthPage-thumnail">
                  <div className="thumNailContent-5">
                    <img
                      className="ayi-img3"
                      src={AyiImage}
                      alt="아이그레mainLogo3"
                    />
                    <p className="secondWords-5">
                      앱을 다운받으시고
                      <br />
                      편리한 정기배송 서비스를
                      <br />
                      이용해보세요
                      <br />
                    </p>

                    <button
                      type="button"
                      className="section-link-5"
                      data-toggle="modal"
                      onClick={handleShow}
                    >
                      <p className="link5-text">앱 다운로드</p>
                    </button>
                  </div>
                </div>

                <div className="inSide-img5-area">
                  {desktop && (
                    <img
                      className="inSide-Img-5"
                      src={footerImg}
                      alt="아이그레PCLogo2"
                    />
                  )}
                  {phone && (
                    <img
                      className="inSide-Img-5"
                      src={footerImgM}
                      alt="아이그레MobileLogo2"
                    />
                  )}
                </div>
              </div>
              <div className="linkSite">
                <p
                  className="fab fa-instagram"
                  onClick={instaLink}
                  style={{ textDecoration: 'none', outline: 'none' }}
                  aria-hidden="true"
                />
                <img
                  className="brand"
                  src={brand}
                  onClick={blogLink}
                  alt="igre-linkToBlog"
                  aria-hidden="true"
                />
              </div>
              <Footer />
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
                  className="modal-logo"
                  src={AyiImage}
                  alt="아이그레Modal-logoImg"
                />
                <p className="modal-textP">, 더 간편하게 앱으로 만나보세요!</p>
              </div>
              <p className="modal-text2">앱 설치주소 메시지로 받기</p>
              <input
                type="tel"
                className="modal-input"
                placeholder="핸드폰 번호입력  ( - 제외 )"
                // pattern="[0-9]{2,3}-[0-9]{3,4}-[0-9]{3,4}"
                onChange={inptChange}
                value={inptNum}
              />
              <br />
              <div className="modal-changeArea">
                {finalCheck ? makeCertificElement() : makeAgreeElement()}
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
                <p className="modal-first">더 많은 정보가 궁금하시다면</p>
                <img
                  className="modal-logo"
                  src={AyiImage}
                  alt="아이그레Modal-logoImg"
                />
                ,<p className="modal-second"> 더 간편하게 앱으로 만나보세요!</p>
              </p>
              <button type="button" className="modal-btn" onClick={igreLink}>
                <p className="material-icons">save_alt</p>
                <p className="btnWord">앱 다운로드</p>
              </button>
            </Modal.Body>
          </Modal>
        )}

        {spinIndex === 0 && (
          <div className="downSide">
            <div className="mouseDown">
              <i className="fas fa-mouse" />
              <i className="fas fa-angle-double-down" />
            </div>
          </div>
        )}

        {spinIndex > 0 && spinIndex < 4 && (
          <div className="linkArea">
            <HoverImage
              className="section-link"
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
      </div>
    </main>
  );
};

export default Landing;
