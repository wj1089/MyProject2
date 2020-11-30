import React, {useState,useEffect,useRef} from 'react';
import {useHistory} from 'react-router-dom'
import MenuBar from '../navigation/MenuBar';
import Footer from '../footer/Footer';
import axios from 'axios';
import {Modal,Button} from 'react-bootstrap'
import HoverImage from "react-hover-image"
import './Landing.css'
import '../contentCard/ContentCard.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import AyiImage from '../../resource/logo_wm.png'
import BtnRight from "../../resource/arrow_forward_ios.svg";
import BtnLeft from "../../resource/arrow_back_ios.svg";
import phoneImg from "../../resource/phone_section1.gif"
import deliveryImg from "../../resource/phone_section2_pc.png"
// import appDownBtn from "../../resource/appdownload_pc.png"
import footerImg from "../../resource/footer_pc.png"
import modalDown from "../../resource/logo_wm.png"
import greenDown from "../../resource/appdownload_pc.png"
import whiteDown from "../../resource/appdownload_pc-hover.png"

const TOTAL_SLIDES = 2;
const Landing = () => {

    const [spinIndex, setSpinIndex] = useState(0);
    const [canScroll, setCanScroll] = useState(true);
    const sectionTitle = [ 'Main', 'Delivery', 'Review','Hotmenu','Downintro' ];
    const mainContent = useRef();
    
    const history = useHistory();




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

    }, [spinIndex]);

    useEffect(() => {
        setTimeout(function() {
            setCanScroll(true);
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



//Review section && Slide
        const [currentSlide, setCurrentSlide] = useState(0);
        const slideRef = useRef(null);
        const [currentSlide2, setCurrentSlide2] = useState(0);
        const slideRef2 = useRef(null);

        // Review 다음 슬라이드
            const slideBtn_R = () => {
                if (currentSlide >= TOTAL_SLIDES) { // 더 이상 넘어갈 슬라이드가 없으면 슬라이드를 초기화합니다.
                setCurrentSlide(0);
                } else {
                setCurrentSlide(currentSlide + 1);
                }
            };

        // Review 전 슬라이드
            const slideBtn_L = () => {
                if (currentSlide === 0) {
                setCurrentSlide(TOTAL_SLIDES);
                } else {
                setCurrentSlide(currentSlide - 1);
                }
            };

        // HotTrack 다음 슬라이드
        const HTslideBtn_R = () => {
            if (currentSlide2 >= TOTAL_SLIDES) { // 더 이상 넘어갈 슬라이드가 없으면 슬라이드를 초기화합니다.
            setCurrentSlide2(0);
            } else {
            setCurrentSlide2(currentSlide2 + 1);
            }
        };

        // HotTrack 전 슬라이드
            const HTslideBtn_L = () => {
                if (currentSlide2 === 0) {
                setCurrentSlide2(TOTAL_SLIDES);
                } else {
                setCurrentSlide2(currentSlide2 - 1);
                }
            };

        useEffect(() => {
            //section 3
            slideRef.current.style.transition = "all 1.5s ease-in-out";
            slideRef.current.style.transform = `translateX(-${currentSlide}00%)`; // 백틱을 사용하여 슬라이드로 이동하는 애니메이션을 만듭니다.
            //section 4
            slideRef2.current.style.transition = "all 1.5s ease-in-out";
            slideRef2.current.style.transform = `translateX(-${currentSlide2}00%)`; 
        }, [currentSlide,currentSlide2]);


//HotTrack axios, API연결
        const [msg, setMsg] = useState([]);

            useEffect(()=>{
                axios
                .get(`https://igre-prod.appspot.com/_ah/api/category/v1/getList?id=6476096291733504`)
                .then(response=>{
                    if(response && response.data.code === "1"){
                        const parseJson = JSON.parse(response.data.msg);
                        // console.log(parseJson)
                        setMsg(parseJson[0].products)
                        console.log(parseJson)
                    }
                })
                .catch(error=>{
                    console.log(error)
                })
            },[])

            const [show, setShow] = useState(false);

            const handleClose = () => setShow(false);
            const handleShow = () => setShow(true);


    

//Review axios, API 연결
        // const [msga, setMsga] = useState([]);
        const [item, setItem] = useState([]);
        useEffect(()=>{
            axios
            .get(`https://childsnack-test.appspot.com/_ah/api/review/v1/getReviewList?count=20&startCursor=0`)
            .then(res=>{
                if(res && res.data.code === "1"){
                    const parseJson = JSON.parse(res.data.msg)
                    const aaaa = parseJson.item
                    setItem(aaaa);
                }
            })
            .catch(err=>{
                console.log(err)
            })
        },[]);




    return (
        <main className="full_screen">

            {/* 상단메뉴바 */}
            <MenuBar/>
          
            <div className="main_content" onWheel = {wheel} ref={mainContent}>
            

    {/* 첫번째 페이지 */}
                <section className="fbp main" data-title="Main">

                    {/* OutSide Image */}
                    <div className="outSide_Image">      

                        <div className="section_container">
                            <div className="firstPage_thumnail">
                                <p className="font1"><img className="ayi_img" src={AyiImage}/></p>
                                <p className="font2">
                                            어린이 식품 <br/>
                                            정기배송 서비스
                                </p>
                                </div>
                                <button className="section_link_1" onClick={handleClick}>
                                    <>앱 다운로드</>
                                </button>
                        </div>

                        {/* InSide Image */}
                        <div className="inSide_Img">
                            <img className="main_phnGui" src={phoneImg}/>
                        </div>
                    </div>

                </section>

    {/* 두번째 페이지 */}

                <section className="fbp delivery" data-title="Delivery">
                    
                    {/* OutSide Image */}
                    <div className="outSide_Image">    

                        <div className="section_container_2">
                            <div className="secondPage_thumnail">
                                <p className="font1"> 다양한 상품을</p>
                                <p className="font1-2">편리한 정기배송으로</p>
                                <p className="font2">
                                            매달 새로운 구성의 정기배송 박스를 <br/>
                                            기존 대비 합리적인 비용으로 <br/>
                                            만나보실 수 있습니다.
                                </p>
                            </div>
                            {/* className="size2"  */}
                            <HoverImage 
                                className="section_link_2" 
                                onClick={handleClick}
                                src={greenDown}
                                hoverSrc={whiteDown}
                                />
                            
                        </div>

                        <div className="inSide_Img2">
                            <img className="deliImgSize" src={deliveryImg}></img>
                        </div>

                    </div>
                </section>





    {/* 세번째 페이지 */}
                <section className="fbp review" data-title="Review">

                    {/* outSide_Image_5 */}
                    <div className="outSide_Image_3">      

                        <div className="section_container_3">
                            <div className="thirdPage_thumnail">
                                        <div className="font1">
                                            <span className="fas fa-hashtag">
                                                <img className="ayi_img" src={AyiImage}/>
                                            </span>
                                        </div>
                                        
                                        <p className="font1-2">고객후기</p>
                                        <p className="font2">
                                            정기배송을 경험한 <br/>
                                            고객님들의 후기를 <br/>
                                            확인해보세요. 
                                        </p>
                            </div>

                            {/* 상품리뷰 슬라이드 */}
                            
                        <div className="revSlide">
                            <div className="SliderContainer" ref={slideRef}>
                            {
                                item.map( item => (
                                    <div className="inSide_slide">
                                        <div className="slide_img" key={item.id}>
                                            <img className="imgSize" src={item.product.thumnail}/>
                                            <div className="RV_iconArea">
                                                <span className="material-icons">
                                                            favorite
                                                </span>
                                            </div>
                                            <p className="slide_text">
                                                <p className="RV_contentName">{item.point}</p>
                                                <p className="RV_contentDes">{item.description}</p> 
                                            </p>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>

                <div>
                        <button className="clickBtn_L" onClick={slideBtn_L}>
                            <img className="btnSize" src={BtnLeft}/>
                        </button>

                        <button className="clickBtn_R" onClick={slideBtn_R}>
                            <img className="btnSize"  src={BtnRight}/>
                        </button>
                </div>
                            
                            {/* 다운버튼 */}
                                    {/* 2번섹션기능 중복사용 */}
                            <HoverImage 
                            className="section_link_3" 
                            onClick={handleClick}
                            src={greenDown}
                            hoverSrc={whiteDown}
                            />

                        </div>
                    </div>

                </section>

    {/*  네번째 페이지 */}
                <section className="fbp hotmenu" data-title="Hotmenu">

                    <div className="section_container_4">
                        <div className="fourthPage_thumnail">
                            <div className="font1">
                                <span className="fas fa-hashtag">
                                    <img className="ayi_img2" src={AyiImage}/>
                                </span>
                            </div>
                                <p className="font3">인기상품<br/></p>
                                <p className="font2">
                                아이그레가 자신있게<br/>
                                추천드리는 상품입니다.
                                </p>
                            {/* onClick={handleClick} */}
                            <div className="moreBtn">
                                <button className="moreBtn">더보기</button>
                            </div>
                        </div>
                    </div>

                        {/* 인기상품 슬라이드 */}
                    <div className="outSide_Image_4">    
                        <div className="HT_sectionarea">
                            <div className="HTSliderContainer" ref={slideRef2}>
                                {
                                    msg.map(msg=>(
                                        <div className="HT_sectionimgs">
                                            <div className="HT_imgSize" key={msg.categoryId} >
                                                
                                                <img 
                                                src={msg.thumnail} 
                                                className="imgSize" 
                                                
                                                />
                                                <p className="HT_contentText"  onClick={handleShow}>
                                                    <p className="HT_contentName">{msg.name}</p><br/>
                                                    <p className="HT_contentDes">{msg.description}</p> 
                                                </p>
                                                {/* <Button variant="primary" >
                                                    Click
                                                </Button> */}
                                                
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                        {/* </div> */}
                

            
                        {/* 슬라이드 버튼 */}

                            <button className="HTclickBtn_L" onClick={HTslideBtn_L}>
                                <img className="btnSize" src={BtnLeft}/>
                            </button>

                            <button className="HTclickBtn_R" onClick={HTslideBtn_R}>
                                <img className="btnSize"  src={BtnRight}/>
                            </button>

                        {/* 2번섹션기능 중복사용 */}
                            <HoverImage 
                                className="section_link_4" 
                                onClick={handleClick}
                                src={greenDown}
                                hoverSrc={whiteDown}
                                />
                    </div>
            </section>

    {/* 다섯번째 페이지 */}
                <section className="fbp downintro" data-title="Downintro">
                    {/* OutSide Image */}
                    <div className="outSide_Image_5">      

                        <div className="section_container_5">
                            <div className="fifthPage_thumnail">
                                    <p className="font1">
                                    <img className="ayi_img2" src={AyiImage}/>
                                    
                                    </p>
                                    <p className="font2">
                                                앱을 다운받으시고<br/>
                                                편리한 정기배송 서비스를<br/> 
                                                이용해보세요 <br/>
                                    </p>
                            </div>
                            
                            <button className="section_link_5" 
                            data-toggle="modal"
                            onClick={handleClick} 
                            > 
                                앱 다운로드
                            </button>
                            <div>
                                <img className="inSide_Img_5" src={footerImg}/>
                            </div>

            {/* 풋터*/}
                        <Footer/>
                        
                        </div>
                        </div>

                        {/* FontAwesome Instagram  */}
                        <a className="fab fa-instagram" href="https://www.instagram.com"/>
                    </section>
                    
            </div>

            <div className="section_navigation">
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
            </div>


            
        </main>
    );
};

export default Landing;