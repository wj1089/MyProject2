import React, {useState,useEffect,useRef} from 'react';
import "../main/Landing.css"
import "./ContentCard.css"

import BtnRight from "../../resource/arrow_forward_ios.svg";
import BtnLeft from "../../resource/arrow_back_ios.svg";
import PropTypes from 'prop-types';

import {Modal} from 'react-bootstrap'
import AyiImage from '../../resource/logo_wm.png'



const TOTAL_SLIDES = 2;
const desktop = window.innerWidth >  768 ? "desktop": "";
const phone   = window.innerWidth <= 768 ? "phone" : "";
const Slider = ({data, containerCss, itemCss, contentCss, imgCss}) => {

    const [spinIndex, setSpinIndex] = useState(0);
    const [canScroll, setCanScroll] = useState(true);
    const [currentSlide,setCurrentSlide] = useState(0);
    const slideRef = useRef(null);
    const mainContent = useRef();

    const sectionTitle = [ 'Main', 'Delivery', 'Review','Hotmenu','Downintro' ];

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    //Route to Google PlayStore
    function handleClick(e) {
        e.preventDefault();
        console.log('Link to Google PlayStore!!')
        window.open("https://play.google.com/store/apps/details?id=com.moriahtown.ismail")
    }


    
    function scrollContent(count) {
        mainContent.current.setAttribute('style', '\
        -webkit-transform: translateY(-'+ count*100 +'vh);\
        -ms-transform: translateY(-'+ count*100 +'vh);\
        -o-transform: translateY(-'+ count*100 +'vh);\
        transform: translateY(-'+ count*100 +'vh);\
        ');
    };

    // Review 왼쪽 슬라이드
    const slideBtn_L = () => {
        if (currentSlide === 0) {
        setCurrentSlide(TOTAL_SLIDES);
        } else {
        setCurrentSlide(currentSlide - 1);
        }
    };

    // Review 오른쪽 슬라이드
        const slideBtn_R = () => {
            if (currentSlide >= TOTAL_SLIDES) {
            setCurrentSlide(0);
            } else {
            setCurrentSlide(currentSlide + 1);
            }
        };


        useEffect(()=>{
            // console.log(data)
        },[data])

        useEffect(() => {
            slideRef.current.style.transition = "all 2s ease-in-out";
            slideRef.current.style.transform = `translateX(-${currentSlide}00%)`; // 백틱을 사용하여 슬라이드로 이동하는 애니메이션을 만듭니다.
        }, [currentSlide]);


        
        //슬라이드 이동(상하)
        let start = 0;
        const touchStart = e =>{
            e.stopPropagation();
        }

        const touchFinish = e =>{
            setCanScroll(false);

            e.stopPropagation();

            // if ( canScroll ) {
            //     if ( start.clientY > e.changedTouches[0].clientY ) {
            //         // scroll down
            //         if ( spinIndex < sectionTitle.length-1 ) setSpinIndex(spinIndex + 1);
                    
            //     } else {
            //         // scroll up
            //         if ( spinIndex > 0 )  setSpinIndex(spinIndex - 1); 
            //     }
            // }   

        }

    return (
        <>
            {/* 모달버튼 */}
                <Modal
                    show={show}
                    onHide={handleClose}
                    
                    backdrop="static"
                    keyboard={false}
                    // dialogClassName="modal-90w"
                    role="dialog"
                    aria-modal="true"
                    trbindex="-1"
                    className="efef"
                >
                <Modal.Header 
                    className="header"
                    closeButton>
                </Modal.Header>

                <Modal.Body
                className="body"
                >
                    <p className="modal-text">더 많은 정보가 궁금하시다면
                    <br/>
                    <img 
                        className="modal_logo" 
                        src={AyiImage}
                        alt="아이그레Modal_LogoImg"
                    /><br/>
                    더 간편하게 앱으로 만나보세요!</p>
                    <br/>

                <button className="modal_btn" onClick={handleClick}>
                    <p className="material-icons" >
                        save_alt</p>
                    <p className="btnWord">
                        앱 다운로드</p>
                </button>
                </Modal.Body>
            </Modal>

            {desktop &&(
            <div 
                onTouchStart={touchStart} 
                onTouchEnd={touchFinish}>

                <button className="clickBtn_L" onClick={slideBtn_L}>
                    <img className="btnSize" src={BtnLeft}/>
                </button>
                <button className="clickBtn_R" onClick={slideBtn_R}>
                    <img className="btnSize"  src={BtnRight}/>
                </button>

                    <div className={containerCss} ref={slideRef} >
                        {
                        data.map( item => (
                            <div className={itemCss}>
                                <div className={contentCss} key={item.id} onClick={handleShow}>
                                    <img 
                                    className={imgCss}
                                    src={item.img}
                                    alt={item.id}
                                    />
                                   {item.content}
                                </div>
                            </div>
                            ))
                        }
                    </div>
            </div>
            )}

            {phone &&(
            <div 
                onTouchStart={touchStart} 
                onTouchEnd={touchFinish}>

                    <div className={containerCss} ref={slideRef} >
                        {
                        data.map( item => (
                            <div className={itemCss}>
                                <div className={contentCss} key={item.id}>
                                    <img 
                                    className={imgCss}
                                    src={item.img}
                                    alt={item.id}
                                    />
                                   {item.content}
                                </div>
                            </div>
                            ))
                        }
                    </div>
            </div>
            )}
        </>
    );
};

export default Slider;

Slider.propTypes = {
    data: PropTypes.array,
    containerCss : PropTypes.string
};

Slider.defaultProps = {
    data: [],
    containerCss: 'SliderContainer',
    itemCss: 'inSide_slide',
    contentCss: 'RV_slideImgArea',
    imgCss: 'RV_imgSize',
  }

  
