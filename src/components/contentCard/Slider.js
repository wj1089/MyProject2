import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import '../../styles/cssfiles/CssFolder';

const Slider = ({
  data,
  containerCss,
  itemCss,
  contentCss,
  imgCss,
  onClickEvent,
  enableTouch,
  autoSlide,
  onMoveEvent,
  viewButton,
}) => {
  const desktop = window.innerWidth > 768 ? 'desktop' : '';
  // const phone = window.innerWidth <= 768 ? 'phone' : '';
  // 슬라이드 시작 단위
  let start = 0;
  // 슬라이드 전체 동작 시간
  const INTERVAL_TIME = 5000;
  // 현재 슬라이드
  const [currentSlide, setCurrentSlide] = useState(0);
  // 슬라이드 Width
  const [slideWidth, setSlideWidth] = useState(0);
  // 총 슬라이드
  const [totalSlide, setTotalSlide] = useState(2);
  // 보여지는 슬라이드 갯수
  const [slideViewCount, setSlideViewCount] = useState(2);

  // auto slide 를 위한 ref 설정
  const refCurrentSlide = useRef(null);
  refCurrentSlide.current = { currentSlide, setCurrentSlide };
  const refTotalSlide = useRef(null);
  refTotalSlide.current = { totalSlide, setTotalSlide };

  const slideRef = useRef(null);
  const itemRef = useRef(null);

  // 슬아이드 움직이는 이밴트 관리
  const [moveEvent, setMoveEvent] = useState(0);
  // 슬라이드 동작 관리
  const moveSlide = (direction) => {
    let calCurrentSlide = 0;
    if (direction > 0) {
      calCurrentSlide = currentSlide + 1;
    } else if (direction === 0) {
      calCurrentSlide = currentSlide - 1;
    }

    if (calCurrentSlide >= totalSlide) calCurrentSlide = 0;
    else if (calCurrentSlide < 0) calCurrentSlide = 0;

    setCurrentSlide(calCurrentSlide);
  };

  const slideBtnLeft = () => {
    moveSlide(-1);
  };
  const slideBtnRight = () => {
    moveSlide(1);
  };

  // 슬라이드 시작점
  const touchStart = (e) => {
    if (!enableTouch) return;
    e.stopPropagation();
    start = e.touches['0'];
  };

  // 슬라이드 끝점
  const touchFinish = (e) => {
    if (!enableTouch) return;
    e.stopPropagation();
    const value = start.clientX - e.changedTouches[0].clientX;
    if (value > 0) {
      moveSlide(1);
    } else if (value === 0) {
      moveSlide(-1);
    }
  };

  // 슬라이드 동작 단위 계산표
  useEffect(() => {
    if (data.length > 0) {
      if (itemRef.current != null) {
        const contentCur = window.getComputedStyle(itemRef.current);
        const contentWidth = contentCur.width.replace('px', '');
        const contenMarginR = contentCur.marginRight.replace('px', '');
        const contenMarginL = contentCur.marginLeft.replace('px', '');
        const calWidth = contentWidth * 1 + contenMarginR * 1 + contenMarginL * 1;

        const containerWidth = slideRef.current.parentNode.clientWidth;
        setSlideWidth(calWidth);

        const viewCount = containerWidth / calWidth;
        setSlideViewCount(Math.floor(viewCount));

        const totalCnt = data.length / viewCount;
        setTotalSlide(Math.ceil(totalCnt));
      }
    }
  }, [data]);

  // 슬라이드 이벤트
  useEffect(() => {
    if (moveEvent > 0) {
      moveSlide(-1);
    } else if (moveEvent < 0) {
      moveSlide(1);
    }
  }, [moveEvent]);

  // 슬라이드 동작 이벤트
  useEffect(() => {
    setMoveEvent(onMoveEvent);
  }, [onMoveEvent]);

  // 슬라이드  전체 슬라이드, 넓이
  useEffect(() => {}, [slideWidth, totalSlide]);

  // 슬라이드동작 Style
  useEffect(() => {
    const movePix = currentSlide * (slideWidth * slideViewCount);
    slideRef.current.style.transition = 'all 2s ease-in-out';
    slideRef.current.style.transform = `translateX(-${movePix}px)`;
  }, [currentSlide, slideViewCount, slideWidth]);

  // autoSlide 설정
  useEffect(() => {
    if (autoSlide) {
      const interval = setInterval(() => {
        refCurrentSlide.current.setCurrentSlide(
          refCurrentSlide.current.currentSlide + 1 >= refTotalSlide.current.totalSlide
            ? 0
            : refCurrentSlide.current.currentSlide + 1,
        );
      }, INTERVAL_TIME);
      return () => clearInterval(interval);
    }
  }, [autoSlide, INTERVAL_TIME]);

  return (
    <>
      { desktop && viewButton && (
        <>
          <button type="button" className="clickBtn-L" onClick={slideBtnLeft}>
            <span className="material-icons">arrow_back_ios</span>
          </button>
          <button type="button" className="clickBtn-R" onClick={slideBtnRight}>
            <span className="material-icons">arrow_forward_ios</span>
          </button>
        </>
      )}
      <div onTouchStart={touchStart} onTouchEnd={touchFinish}>
        <div className={containerCss} ref={slideRef}>
          {data.map((item) => (
            <div className={itemCss} ref={itemRef} key={item.index}>
              <div className={contentCss} aria-hidden="true" onClick={onClickEvent}>
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
  data: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.object, PropTypes.number, PropTypes.string, PropTypes.func, PropTypes.bool])),
  containerCss: PropTypes.string,
  itemCss: PropTypes.string,
  contentCss: PropTypes.string,
  imgCss: PropTypes.string,
  onClickEvent: PropTypes.func,
  viewButton: PropTypes.bool,
  enableTouch: PropTypes.bool,
  autoSlide: PropTypes.bool,
};

Slider.defaultProps = {
  data: [],
  containerCss: 'sliderContainer',
  itemCss: 'inSide-slide',
  contentCss: 'rv-slideImgArea',
  imgCss: 'rv-imgSize',
  onClickEvent: null,
  viewButton: false,
  enableTouch: true,
  autoSlide: false,
};
