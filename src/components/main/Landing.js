import React, {useState,useEffect,useRef} from 'react';
// import {useHistory} from 'react-router-dom'
import MenuBar from '../navigation/MenuBar';
import Footer from '../footer/Footer';
import axios from 'axios';
import {Modal} from 'react-bootstrap'
import HoverImage from "react-hover-image"
import './Landing.css'
import '../contentCard/ContentCard.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AyiImage from '../../resource/logo_wm.png'
import BtnRight from "../../resource/arrow_forward_ios.svg";
import BtnLeft from "../../resource/arrow_back_ios.svg";
import phoneImg from "../../resource/phone_section1.gif"
import deliveryImg from "../../resource/phone_section2_pc.gif"
import deliveryImg_phone from "../../resource/phone_section2_mobile.png"

import footerImg from "../../resource/footer_pc.png"
import footerImgM from "../../resource/footer_mobile.png"

import greenDown from "../../resource/appdownload_pc.png"
import whiteDown from "../../resource/appdownload_pc-hover.png"

import Slider from "../contentCard/Slider.js"
import { computeHeadingLevel } from '@testing-library/react';





const TOTAL_SLIDES = 2;
const desktop = window.innerWidth >  768 ? "desktop": "";
const phone   = window.innerWidth <= 768 ? "phone" : "";

const Landing = () => {
    
    // const history = useHistory();
    const [spinIndex, setSpinIndex] = useState(0);
    const [canScroll, setCanScroll] = useState(true);
    const sectionTitle = [ 'Main', 'Delivery', 'Review','Hotmenu','Downintro' ];
    const mainContent = useRef();
    


    //Route to Google PlayStore
        function handleClick(e) {
            e.preventDefault();
            console.log('Link to Google PlayStore!!')
            window.open("https://play.google.com/store/apps/details?id=com.moriahtown.ismail")
        }


    //main 스크롤
        useEffect(() => {        
            scrollContent(spinIndex);
            console.log(spinIndex)
            // console.log("Scroll Content")
        }, [spinIndex]);

        useEffect(() => {
            setTimeout(function() {
                setCanScroll(true);
                // console.log("Can Scroll")
                // console.log(spinIndex)
            }, 100);  
        }, [canScroll]);

        const buttonClick = e =>{
            setSpinIndex(sectionTitle.indexOf(e.target.textContent.trim()))
        }

        const wheel = e => {
            if ( canScroll ) {
                setCanScroll(false);
                if ( e.deltaY > 0 ) {
                    // scroll down
                    if ( spinIndex < sectionTitle.length-1 ) setSpinIndex(spinIndex + 1);
                } else {
                    // scroll up
                    if ( spinIndex > 0 )  setSpinIndex(spinIndex - 1);
                }
            }   
        };  

        function scrollContent(count) {
            mainContent.current.setAttribute('style', '\
            -webkit-transform: translateY(-'+ count*100 +'vh);\
            -ms-transform: translateY(-'+ count*100 +'vh);\
            -o-transform: translateY(-'+ count*100 +'vh);\
            transform: translateY(-'+ count*100 +'vh);\
            ');
        };

        // function slideContent(count) {
        //     mainContent.current.setAttribute('style', '\
        //     -webkit-transform: translateX(-'+ count*30 +'vh);\
        //     -ms-transform: translateX(-'+ count*30 +'vh);\
        //     -o-transform: translateX(-'+ count*30 +'vh);\
        //     transform: translateX(-'+ count*30 +'vh);\
        //     ');
        // };



//Review section && Slide
        const [currentSlide, setCurrentSlide] = useState(0);
        const slideRef = useRef(null);

        // Review 왼쪽 슬라이드
        const slideBtn_L = () => {
            // console.log("currentSlide_L")
            // console.log(currentSlide)

            if (currentSlide === 0) {
            setCurrentSlide(TOTAL_SLIDES);
            } else {
            setCurrentSlide(currentSlide - 1);
            }
        };

        // Review 오른쪽 슬라이드
            const slideBtn_R = () => {
                // console.log("currentSlide_R")
                // console.log(currentSlide)
                if (currentSlide >= TOTAL_SLIDES) { // 더 이상 넘어갈 슬라이드가 없으면 슬라이드를 초기화합니다.
                setCurrentSlide(0);
                } else {
                setCurrentSlide(currentSlide + 1);
                }
            };



            
//Review axios, API 연결
        const [reviewItem, setReviewItem] = useState([]);
            useEffect(()=>{
                axios
                .get(`https://childsnack-test.appspot.com/_ah/api/review/v1/getReviewList?count=20&startCursor=0`)
                .then(res=>{
                    if(res && res.data.code === "1"){
                        const parseJson = JSON.parse(res.data.msg)
                        const aaaa = parseJson.item
                        // console.log("aaaa")
                        // console.log(aaaa)
                        var RevArr = [];
                        aaaa.map( item => (  
                            RevArr.push({
                                id: item.id,
                                img: item.product.thumnail,
                                content: makeReviewElement(item.point, item.description)
                            })
                            ))
                        setReviewItem(RevArr);
                    }
                })
                .catch(err=>{
                    console.log(err)
                })
            },[]);
      
                        console.log("reviewItem.item.id")
                        console.log(reviewItem[0])
        
        function makeReviewElement(point, description) {
            return (    
                <div className="RV_downArea">
                    <div className="RV_iconArea">
                        <span className="material-icons">
                            favorite</span>
                            </div>
                    <div className="RV_slideText"
                         
                    >
                        <p className="RV_contentName">1
                            {point}
                            </p>
                            <p className="RV_contentDescrip">
                            {description}
                            </p>
                    </div>
                </div>
            )
        }


//HotTrack axios, API연결
        const [productItem, setProductItem] = useState([]);
            // console.log(productItem[0])
            useEffect(()=>{
                axios
                .get(`https://igre-prod.appspot.com/_ah/api/category/v1/getList?id=6476096291733504`)
                .then(response=>{
                    
                    if(response && response.data.code === "1"){
                    // 1번(데이터를 가져온다.)
                        const parseJson = JSON.parse(response.data.msg);
                    // 2번(데이터 가공)
                        const bbbb = parseJson[0].products;
                        var hotTrackArr = [];
                        bbbb.map( product => (
                            hotTrackArr.push({
                                id: product.prodectId,
                                img: product.thumnail,
                                content: makeHotTrackElement(product.name, product.description)

                            })
                            ))
                            
                    // 3번 데이터저장
                        setProductItem(hotTrackArr);
                    }
                })
                .catch(error=>{
                    console.log(error)
                })
            },[])


        function makeHotTrackElement(name, description) {
            return (    
                <>            
                        
                        <p className="HT_contentText">
                            <p className="HT_contentName">
                                {name}
                            </p>
                            <p className="HT_contentDescrip">
                                {description}
                            </p> 
                        </p>
                </>
            )
        }


            const [show, setShow] = useState(false);

            const handleClose = () => setShow(false);
            const handleShow = () => setShow(true);


    //슬라이드 이동(상하)
        let start = 0;
        const touchStart = e =>{
            // start = e.touches[0]
            e.stopPropagation();
            start = e.touches[0]
        }

        const touchFinish = e =>{
            setCanScroll(false);
            e.stopPropagation();

        if ( canScroll ) {
            if ( start.clientY > e.changedTouches[0].clientY ) {
                // scroll down
                if ( spinIndex < sectionTitle.length-1 ) setSpinIndex(spinIndex + 1);
                
            } else {
                // scroll up
                if ( spinIndex > 0 )  setSpinIndex(spinIndex - 1); 
            }
        }   
    }





    return (
        <main className="full_screen">

            {/* 상단메뉴바 */}
            <MenuBar/>
            <div
            className="main_content" 
            onTouchStart={touchStart} 
            onTouchEnd={touchFinish}
            onWheel = {wheel} 
            ref={mainContent}>
            
            
    {/* 첫번째 페이지 */}
                <section className="fbp main" data-title="Main">
                        <div className="outSide_Image">   
                            <div className="section_container_1">
                                <div className="firstPage_thumnail">
                                    <img 
                                        className="ayi_img" 
                                        src={AyiImage} 
                                        alt="아이그레mainLogo"/>
                                    <p className="font2">
                                                어린이 식품 <br/>
                                                정기배송 서비스
                                    </p>
                                    <button 
                                        className="section_link_1" 
                                        onClick={handleClick}
                                        >
                                    <p className="link1_text">앱 다운로드</p>
                                    </button>
                                </div>
                                {/* InSide Image */}
                                <div className="inSide_Img">
                                    <img 
                                        src={phoneImg} 
                                        alt="아이그레infoSlide"
                                        className="main_phnGif"/>
                                </div>
                            </div>
                        </div>
                        <div className="mouseDown">
                            <i className="fas fa-mouse"/>
                            <i className="fas fa-angle-double-down"/>
                        </div>
                </section>

    {/* 두번째 페이지 */}
                <section className="fbp delivery" data-title="Delivery">
                    {/* OutSide Image */}

                    <div className="outSide_Image2">
                        <div className="section_container_2">
                            <span className="secondPage_thumnail">
                                <p className="font1"> 다양한 상품을</p>
                                <p className="font1-2">편리한 정기배송으로</p>
                                <p className="font2">
                                            매달 새로운 구성의 정기배송 박스를 <br/>
                                            기존 대비 합리적인 비용으로 <br/>
                                            만나보실 수 있습니다.
                                </p>
                            </span>

                            { 
                                desktop &&(
                                    <span className="inSide_Img2">
                                        <img 
                                        className="delivery_phnGif" 
                                        src={deliveryImg}
                                        alt="아이그레gifImage-1"
                                        >
                                        </img>
                                    </span>
                                
                            
                            )
                            }

                            { 
                                phone &&(
                                    <span className="inSide_Img2">
                                        <img 
                                        className="delivery_phnGif" 
                                        src={deliveryImg_phone}
                                        alt="아이그레gifImage-1"
                                        />
                                    </span>
                                )
                            }
                        </div>
                    <div className="mouseDown2">
                            <i className="fas fa-angle-double-down"/>
                    </div>
                    </div>
                </section>
                            




    {/* 세번째 페이지 */}
                <section className="fbp review" data-title="Review">
                    
                { desktop &&(
                    <>
                    <div className="outSide_Image_3"/>  
                    <div className="section_container_3"> 
                                <div className="thirdPage_thumnail">
                                        <div className="font1">
                                            <div className="fas fa-hashtag">
                                                <img 
                                                    className="ayi_img2" 
                                                    src={AyiImage}
                                                    alt="아이그레mainLogo-2"
                                                />
                                                <p className="font1-2">고객후기</p>
                                                <p className="font2">
                                                    정기배송을 경험한 <br/>
                                                    고객님들의 후기를 <br/>
                                                    확인해보세요. 
                                                </p>
                                            </div>
                                        </div>
                                </div> 

                            {/* 상품리뷰 슬라이드 */}
                             <div className="revSlide">

                                <Slider 
                                data={reviewItem} 
                                containerCss={"SliderContainer"}
                                itemCss= {"inSide_slide"}
                                contentCss= {"RV_slideImgArea"}
                                imgCss= {"RV_imgSize"}
                                />
                                </div> 
                        </div> 
                    </>
                         ) }

                { phone &&(
                    <div className="outSide_Image_3">      
                        <div className="section_container_3">
                            <div className="thirdPage_thumnail">
                                    <div className="font1">
                                        <p className="fas fa-hashtag"></p>
                                        <p className="font1-2">고객후기</p>
                                    </div>
                            </div>

                             <div className="revSlide">

                                <Slider data={reviewItem}/>

                                {/* <div className="SliderContainer" ref={slideRef}>
                                    {
                                        reviewItem.map( reviewItem => (
                                            <div className="inSide_slide">
                                                <div className="RV_slideImgArea" key={reviewItem.id}>
                                                    <img 
                                                    className="RV_imgSize" 
                                                    src={reviewItem.img}
                                                    alt="아이그레ReviewImage"
                                                    />
                                                </div>

                                                    <div className="RV_downArea">
                                                        <div className="RV_iconArea">
                                                            <span className="material-icons">
                                                                favorite
                                                            </span>
                                                        </div>
                                                        <div className="RV_slideText">
                                                            <p className="RV_contentName">{reviewItem.content.point}</p>
                                                            <p className="RV_contentDescrip">{reviewItem.content.description}</p> 
                                                        </div>
                                                    </div>
                                            </div>
                                        ))
                                    }
                                </div> */}
                            </div> 
                        </div>
                    </div>
                )}
                <div className="mouseDown3">
                    <i className="fas fa-angle-double-down"/>
                </div>
                </section>

    {/* 네번째 페이지 */}
                <section className="fbp hotmenu" data-title="Hotmenu">

                    { desktop &&(
                    <>
                    <div className="outSide_Image_4"/>    

                        <div className="section_container_4" >
                            <div className="fourthPage_thumnail">
                                <div className="fourth_font1">
                                    <div className="fas fa-hashtag"/>
                                    <img 
                                            className="ayi_img2" 
                                            src={AyiImage}
                                            alt="아이그레mainLogo-2"
                                        />
                                
                                    <p className="font3">인기상품<br/></p>
                                    <p className="font2">
                                    아이그레가 자신있게<br/>
                                    추천드리는 상품입니다. </p>
                                    <button className="moreBtn"  onClick={handleClick}>
                                        더보기
                                    </button>
                                </div>
                            </div> 
                        
                            <div className="HT_sectionarea">

                                <Slider 
                                    data={productItem} 
                                    containerCss={"HTSliderList"}
                                    itemCss={"HT_sectionimgs"}
                                    contentCss={"HT_cardArea"}
                                    imgCss={"HT_imgSize"}
                                    />
                            </div>
                        </div>
                    </>



                    )}
                       
                        {/* { phone &&(
                            <div className="section_container_4" >
                                <div className="fourthPage_thumnail">
                                    <div className="fourth_font1">
                                        <p className="fas fa-hashtag"/>
                                        <p className="font3">인기상품
                                        <img 
                                        src={BtnRight}
                                        className="moreBtn_mobile" 
                                        onClick={handleClick}/>
                                        </p>
                                        
                                    </div>
                                        <p className="font2">
                                        아이그레가 자신있게<br/>
                                        추천드리는 상품입니다. 
                                        </p>
                                </div>
                        
                                <div className="HT_sectionarea">

                                    <Slider 
                                        data={productItem} 
                                        containerCss={"HTSliderList"}
                                        itemCss={"HT_sectionimgs"}
                                        contentCss={"HT_cardArea"}
                                        imgCss={"HT_imgSize"}
                                        /> */}


                                    {/* <div 
                                        className="HTSliderList" 
                                        key={productItem.categoryId}
                                        // ref={slideRef2}
                                    >
                                        {
                                        productItem.map(productItem=>(
                                            <div className="HT_sectionimgs">
                                                <div className="HT_cardArea"  >
                                                    <img 
                                                    src={productItem.thumnail} 
                                                    className="HT_imgSize" 
                                                    alt="아이그레HotTrack_Image"
                                                    />
                                                    <p className="HT_contentText"  onClick={handleShow} >
                                                        <p className="HT_contentName">{productItem.name}</p>
                                                        <p className="HT_contentDescrip">{productItem.description}</p> 
                                                    </p>
                                                
                                                </div>
                                            </div>
                                        ))
                                        }
                                    </div> */}
                                {/* </div> */}
                        {/* </div>
                        )} */}


                            {/* 모달버튼
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
                            </Modal> */}
            </section>

    {/* 다섯번째 페이지 */}
                <section className="fbp downintro" data-title="Downintro">
                    {/* OutSide Image */}
                    <div className="outSide_Image_5">      

                        <div className="section_container_5">
                            <div className="fifthPage_thumnail">
                                    <p className="font1">
                                    <img 
                                    className="ayi_img3" 
                                    src={AyiImage}
                                    alt="아이그레mainLogo3"
                                    />
                                    
                                    </p>
                                    <p className="font2">
                                                앱을 다운받으시고<br/>
                                                편리한 정기배송 서비스를<br/> 
                                                이용해보세요 <br/>
                                    </p>
                                    <button 
                                        className="section_link_5" 
                                        data-toggle="modal"
                                        onClick={handleClick} 
                                        > 
                                        <p className="link5_text">앱 다운로드</p>
                                    </button>
                            </div>

                            <div className="inSide_Img5_area">
                                {desktop &&(
                                    <img 
                                    className="inSide_Img_5" 
                                    src={footerImg}
                                    alt="아이그레PCLogo2"
                                    />
                                )}
                                    {phone &&(
                                    <img 
                                    className="inSide_Img_5" 
                                    src={footerImgM}
                                    alt="아이그레MobileLogo2"
                                    />
                                )}
                            </div>
                        </div>
                            
                        {/* FontAwesome Instagram  */}
                        <a 
                        className="fab fa-instagram" 
                        href="https://www.instagram.com"
                        style={{ textDecoration: 'none', outline: 'none' }}
                        />
                        <Footer/>

                    </div>
                </section>
                    
            </div>
           
             {/* <div className="section_navigation">
                {sectionTitle.map((nl, index) => {
                    return (
                        <div className={`section_button ${spinIndex === index ? "active" : ""}`}
                             onClick = {buttonClick}
                             id={`navigation-${index}`}
                             key={`navigation-${index}`}
                             >
                            <span>{nl}</span>
                        </div>
                    );
                })}
            </div> */}

            {
                (spinIndex > 0 && spinIndex < 4)&&(
                    <div className="linkArea">
                        <HoverImage 
                        className="section_link" 
                        onClick={handleClick}
                        src={greenDown}
                        hoverSrc={whiteDown}
                        alt="아이그레다운이미지"
                        />
                    </div>
                )
            } 
        </main>

        
    );
};

export default Landing;