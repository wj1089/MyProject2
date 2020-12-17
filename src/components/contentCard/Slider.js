import React, { useState, useEffect, useRef } from "react";
import BtnRight from "../../resource/arrow_forward_ios.svg";
import BtnLeft from "../../resource/arrow_back_ios.svg";
import PropTypes from "prop-types";
import { Modal } from "react-bootstrap";
import AyiImage from "../../resource/logo_wm.png";
import "../main/Landing.css";
import "./ContentCard.css";

const desktop = window.innerWidth > 768 ? "desktop" : "";
const phone = window.innerWidth <= 768 ? "phone" : "";

const Slider = ({ data, containerCss, itemCss, contentCss, imgCss, onClickEvent }) => {
    let start = 0;

    const [currentSlide, setCurrentSlide] = useState(0);
    const [slideWidth, setSlideWidth] = useState(0);
    const [totalSlide, setTotalSlide] = useState(2);
    const [slideViewCount, setSlideViewCount] = useState(2);

    const slideRef = useRef(null);
    const itemRef = useRef(null);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //Route to Google PlayStore
    function handleClick(e) {
        e.preventDefault();
        window.open("https://igre.onelink.me/5OuA");
    }
    


    useEffect(() => {
        if (data.length > 0) {                   
            if (itemRef.current != null) {
                let contentCss = window.getComputedStyle(itemRef.current);
                let contentWidth = contentCss.width.replace("px", "");
                let contenMarginR = contentCss.marginRight.replace("px", "");
                let contenMarginL = contentCss.marginLeft.replace("px", "");
                let calWidth =
                    contentWidth * 1 + contenMarginR * 1 + contenMarginL * 1;
                var containerWidth = slideRef.current.parentNode.clientWidth;
                setSlideWidth(calWidth);
                
                
                let viewCount = containerWidth / calWidth; 
                setSlideViewCount(Math.floor(viewCount));
                
                let totalCnt = data.length / viewCount;
                setTotalSlide(Math.ceil(totalCnt));
            }
        }
    }, [data]);

    useEffect(() => {
    }, [slideWidth, totalSlide]);

    useEffect(() => {
        let movePix = currentSlide * (slideWidth * slideViewCount) 

        slideRef.current.style.transition = "all 2s ease-in-out";
        slideRef.current.style.transform = `translateX(-${movePix}px)`;
    }, [currentSlide]);

    const slideBtn_L = () => {
        moveSlide(-1);        
    };
    const slideBtn_R = () => {
        moveSlide(1);        
    };

    const touchStart = (e) => {
        e.stopPropagation();
        start = e.touches[0];
    };

    const touchFinish = (e) => {
        e.stopPropagation();
        let value = start.clientX - e.changedTouches[0].clientX;
        if (value > 0) {
            moveSlide(1);            
        } else if (value === 0) {
        } else {
            moveSlide(-1);
        }
    };

    const moveSlide = (direction) => {        
        var calCurrentSlide = 0;
        if (direction > 0) {
            calCurrentSlide = currentSlide + 1;
        } else if (direction === 0) {
        } else {
            calCurrentSlide = currentSlide - 1;
        }

        if (calCurrentSlide >= totalSlide) calCurrentSlide = 0;
        else if (calCurrentSlide < 0) calCurrentSlide = 0;        
        setCurrentSlide(calCurrentSlide);
    };



    return (
        <>
            {desktop && (
                <div onTouchStart={touchStart} onTouchEnd={touchFinish}>
                    <button className="clickBtn_L" onClick={slideBtn_L}>
                        <img className="btnSize" src={BtnLeft} />
                    </button>
                    <button className="clickBtn_R" onClick={slideBtn_R}>
                        <img className="btnSize" src={BtnRight} />
                    </button>

                    <div className={containerCss} ref={slideRef}>
                        {data.map((item) => (
                            <div className={itemCss} ref={itemRef}>
                                <div
                                    className={contentCss}
                                    key={item.id}
                                    onClick={handleShow}
                                >
                                    <img
                                        className={imgCss}
                                        src={item.img}
                                        alt={item.id}
                                    />
                                    {item.content}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {phone && (
                <div onTouchStart={touchStart} onTouchEnd={touchFinish}>
                    <div className={containerCss} ref={slideRef} >
                        {data.map((item) => (
                            <div className={itemCss} ref={itemRef} >
                                <div className={contentCss} key={item.id} >
                                    <img
                                        className={imgCss}
                                        src={item.img}
                                        alt={item.id}
                                        onClick={onClickEvent}
                                    />
                                    {item.content}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            
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
                더 많은 정보가 궁금하시다면 <br/>
                <img
                  className="modal_logo"
                  src={AyiImage}
                  alt="아이그레Modal_LogoImg"
                /><br/>
                더 간편하게 앱으로 만나보세요!
              </p><br />

              <button className="modal_btn" onClick={handleClick}>
                <p className="material-icons">save_alt</p>
                <p className="btnWord">앱 다운로드</p>
              </button>
            </Modal.Body>
          </Modal>
          
        </>
    );
};

export default Slider;

Slider.propTypes = {
    data: PropTypes.array,
    containerCss: PropTypes.string,
    itemCss: PropTypes.string,
    contentCss: PropTypes.string,
    imgCss: PropTypes.string,
};

Slider.defaultProps = {
    data: [],
    containerCss: "SliderContainer",
    itemCss: "inSide_slide",
    contentCss: "RV_slideImgArea", 
    imgCss: "RV_imgSize",
    onClickEvent : null,
};