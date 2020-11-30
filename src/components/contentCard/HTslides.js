import React, {useState,useEffect,useRef} from 'react';
// import './ContentCard.css'
import axios from 'axios';
import HotTrack from './HotTrack'
// import BtnRight from "../../resource/right.png";
// import BtnLeft from "../../resource/left.png";



const TOTAL_SLIDES = 2;

const HTslides = () => {

    

    
    const [currentSlide, setCurrentSlide] = useState(0);
    const slideRef = useRef(null);

    // 다음슬라이드
        const slideBtn_R = () => {
            if (currentSlide >= TOTAL_SLIDES) { // 더 이상 넘어갈 슬라이드가 없으면 슬라이드를 초기화합니다.
            setCurrentSlide(0);
            } else {
            setCurrentSlide(currentSlide + 1);
            }
        };

    // 전슬라이드
        const slideBtn_L = () => {
            if (currentSlide === 0) {
            setCurrentSlide(TOTAL_SLIDES);
            } else {
            setCurrentSlide(currentSlide - 1);
            }
        };

    useEffect(() => {
        slideRef.current.style.transition = "all 1.5s ease-in-out";
        slideRef.current.style.transform = `translateX(-${currentSlide}00%)`; // 백틱을 사용하여 슬라이드로 이동하는 애니메이션을 만듭니다.
    }, [currentSlide]);

    return (
        <div>
            {currentSlide}

            <div className="HT_sectionarea">

                        <div className="SliderContainer" ref={slideRef}>

                                {/* 슬라이드 버튼 */}

                                {/* 각 컨텐츠 */}
                                <HotTrack 
                                    hottrackInfor={{
                                    name:"Apple", 
                                    imgUrl:"https://t1.daumcdn.net/cfile/tistory/18614A3C4FC857C32D", 
                                    text:"first content"}}
                                />

                            </div>

                    </div>
                            <div>
                                {/* 슬라이드 버튼 */}
                                    
                                <button className="HTclickBtn_L" onClick={slideBtn_L}>
                                    <img className="btnSize" src={BtnLeft}/>
                                </button>

                                <button className="HTclickBtn_R" onClick={slideBtn_R}>
                                    <img className="btnSize"  src={BtnRight}/>
                                </button>
                            </div>
        </div>
    );
};

export default HTslides;