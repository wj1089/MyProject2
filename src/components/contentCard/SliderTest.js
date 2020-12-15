import React, { useState, useEffect, useRef } from "react";
import "../main/Landing.css";
import "./ContentCard.css";
import BtnRight from "../../resource/arrow_forward_ios.svg";
import BtnLeft from "../../resource/arrow_back_ios.svg";
import PropTypes from "prop-types";
import HoverImage from "react-hover-image/build";

import { Modal } from "react-bootstrap";
import AyiImage from "../../resource/logo_wm.png";

const desktop = window.innerWidth > 768 ? "desktop" : "";
const phone = window.innerWidth <= 768 ? "phone" : "";

const SliderTest = ({ data, containerCss, itemCss, contentCss, imgCss, onClickEvent }) => {
    let start = 0; // 터치 이벤트

    const [currentSlide, setCurrentSlide] = useState(0);
    const [slideWidth, setSlideWidth] = useState(0);
    const [totalSlide, setTotalSlide] = useState(2);
    const [slideViewCount, setSlideViewCount] = useState(2);

    const slideRef = useRef(null);
    const itemRef = useRef(null);

    ////////// region useEffect //////////    
    useEffect(() => {
        if (data.length > 0) {                   
            if (itemRef.current != null) {
                // 현재 컨텐츠의 element 를 가지고온다.
                // 현재 적용중인 css의 넓이를 알아오기위해.
                // css의 넓이와, 현재 컨텐츠의 넓이를 비교하여
                // 보여지는 슬라이드와, 남겨진 슬라이드의 개수를 비교한다.
                let contentCss = window.getComputedStyle(itemRef.current);
                let contentWidth = contentCss.width.replace("px", "");
                let contenMarginR = contentCss.marginRight.replace("px", "");
                let contenMarginL = contentCss.marginLeft.replace("px", "");
                let calWidth =
                    contentWidth * 1 + contenMarginR * 1 + contenMarginL * 1;
                    // offsetParent
                var containerWidth = slideRef.current.clientWidth;
                setSlideWidth(calWidth);
                
                
                let viewCount = containerWidth / calWidth; // 화면에 보여지는 개수
                setSlideViewCount(Math.floor(viewCount));
                
                let totalCnt = data.length / viewCount;
                setTotalSlide(Math.ceil(totalCnt)); // 총 슬라이드의 개수
                
            }
        }
    }, [data]);

    useEffect(() => {
    }, [slideWidth, totalSlide]);

    useEffect(() => {
        let movePix = currentSlide * (slideWidth * slideViewCount) 

        slideRef.current.style.transition = "all 2s ease-in-out";
        slideRef.current.style.transform = `translateX(-${movePix}px)`; // 백틱을 사용하여 슬라이드로 이동하는 애니메이션을 만듭니다.
    }, [currentSlide]);
    ////////// endregion useEffect //////////

    // Review 왼쪽 슬라이드
    const slideBtn_L = () => {
        moveSlide(-1);        
    };

    // Review 오른쪽 슬라이드
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
        } else if (value == 0) {
        } else {
            moveSlide(-1);
        }
    };

    // slide move func.
    const moveSlide = (direction) => {        
        var calCurrentSlide = 0;
        if (direction > 0) {
            calCurrentSlide = currentSlide + 1;
        } else if (direction == 0) {
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
                                    onClick={onClickEvent}
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
                    <div className={containerCss} ref={slideRef}>
                        {data.map((item) => (
                            <div className={itemCss} ref={itemRef}>
                                <div className={contentCss} key={item.id}>
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
        </>
    );
};

export default SliderTest;

SliderTest.propTypes = {
    data: PropTypes.array,
    containerCss: PropTypes.string,
    itemCss: PropTypes.string,
    contentCss: PropTypes.string,
    imgCss: PropTypes.string,
};

SliderTest.defaultProps = {
    data: [],
    containerCss: "SliderContainer",
    itemCss: "inSide_slide",
    contentCss: "RV_slideImgArea",
    imgCss: "RV_imgSize",
    onClickEvent : null,
};