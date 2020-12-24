import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import "../../styles/cssfiles/CssFolder.js";

const Slider = ({ data, containerCss, itemCss, contentCss, imgCss, onClickEvent, viewButton, enableTouch, autoSlide }) => {
    let start = 0;
    let INTERVAL_TIME = 5000;

    const [currentSlide, setCurrentSlide] = useState(0);
    const [slideWidth, setSlideWidth] = useState(0);
    const [totalSlide, setTotalSlide] = useState(2);
    const [slideViewCount, setSlideViewCount] = useState(2);   
    
    // auto slide 를 위한 ref 설정
    const refCurrentSlide = useRef(null);    
    refCurrentSlide.current = { currentSlide, setCurrentSlide };
    const refTotalSlide = useRef(null);    
    refTotalSlide.current = { totalSlide,  setTotalSlide};

    
    const slideRef = useRef(null);
    const itemRef = useRef(null);

    useEffect(() => {
        if (data.length > 0) {
            if (itemRef.current != null) {
                let contentCss = window.getComputedStyle(itemRef.current);
                let contentWidth = contentCss.width.replace("px", "");
                let contenMarginR = contentCss.marginRight.replace("px", "");
                let contenMarginL = contentCss.marginLeft.replace("px", "");
                let calWidth = contentWidth * 1 + contenMarginR * 1 + contenMarginL * 1;
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
        let movePix = currentSlide * (slideWidth * slideViewCount);

        slideRef.current.style.transition = "all 2s ease-in-out";
        slideRef.current.style.transform = `translateX(-${movePix}px)`;
    }, [currentSlide, slideViewCount, slideWidth]);

    const slideBtn_L = () => {
        moveSlide(-1);
    };
    const slideBtn_R = () => {
        moveSlide(1);
    };

    const touchStart = (e) => {
        if(!enableTouch)
            return;
        e.stopPropagation();
        start = e.touches[0];
    };

    const touchFinish = (e) => {
        if(!enableTouch)
            return;

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

    // autoSlide 설정
    useEffect(() => {
        if(autoSlide){
            const interval = setInterval(() => {     
                refCurrentSlide.current.setCurrentSlide(refCurrentSlide.current.currentSlide + 1 >= refTotalSlide.current.totalSlide ? 0 : refCurrentSlide.current.currentSlide + 1);
            }, INTERVAL_TIME);
            return () => clearInterval(interval);
        }
      }, [autoSlide, INTERVAL_TIME]);

      
    return (
        <>
            <div onTouchStart={touchStart} onTouchEnd={touchFinish}>
                { viewButton && (
                    <>
                    <button className="clickBtn_L" onClick={slideBtn_L}>
                        <span className="material-icons">arrow_back_ios</span>
                    </button>
                    <button className="clickBtn_R" onClick={slideBtn_R}>
                        <span className="material-icons">arrow_forward_ios</span>
                    </button>
                    </>
                )}
                <div className={containerCss} ref={slideRef}>
                    {data.map((item) => (
                        <div className={itemCss} ref={itemRef}>
                            <div className={contentCss} key={item.id} onClick={onClickEvent}>
                                <img className={imgCss} src={item.img} alt={item.id} />
                                {item.content}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
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
    onClickEvent : PropTypes.func,
    viewButton : PropTypes.bool,
    enableTouch : PropTypes.bool,
    autoSlide : PropTypes.bool,
};

Slider.defaultProps = {
    data: [],
    containerCss: "SliderContainer",
    itemCss: "inSide_slide",
    contentCss: "RV_slideImgArea",
    imgCss: "RV_imgSize",
    onClickEvent: null,
    viewButton : true,
    enableTouch : true,
    autoSlide : false,
};
