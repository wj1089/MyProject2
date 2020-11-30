import React from 'react';
import { useHistory } from 'react-router-dom';
import MenuBar from '../navigation/MenuBar.js';
import ContentCard from '../contentCard/ContentCard.js'
import './WidePage.css'

const WidePage = () => {
    
    const history = useHistory();

    return (
        <>
            <div className="WP_main_fullscreen">

                {/* 상단 메뉴 */}
                <MenuBar/>
                <div className="WP_main_contant">
                <div className="WP_topScreen">
                </div>

    
                {/* 전체 메인영역 */}
                    <div className="WP_section_fullarea">


                        
                        {/* 첫번째 섹션*/}
                        <section className="WP_section1">

                            {/* 컨텐츠 제목 */}
                            <div  className="underline">
                                추천상품
                            </div>

                            <div className="WP_sectionarea">
                                {/* 각 컨텐츠 */}

                                <ContentCard 
                                    contentInfor={{name:"John", imgUrl:"sea.jpg", text:"first content"}}
                                />

                                <ContentCard 
                                    contentInfor={{name:"Kerry", imgUrl:"sea.jpg",  text:"first content"}}
                                />
                                
                                <ContentCard 
                                    contentInfor={{name:"Jenna", imgUrl:"sea.jpg", text:"first content"}}
                                />

                                <ContentCard 
                                    contentInfor={{name:"Alexender", imgUrl:"sea.jpg", text:"first content"}}
                                />
                                <ContentCard 
                                    contentInfor={{name:"Kerry", imgUrl:"sea.jpg", text:"first content"}}
                                />

                                <ContentCard 
                                    contentInfor={{name:"Walter", imgUrl:"sea.jpg", text:"first content"}}
                                />

                            </div>

                        </section>

                        {/* 두번째 */}
                        <section className="WP_section2">
                            <p className="underline">간식</p>
                            <div className="WP_sectionarea">
                                    
                                
                            <ContentCard 
                                    contentInfor={{name:"John", imgUrl:"sea.jpg", text:"first content"}}
                                />

                                <ContentCard 
                                    contentInfor={{name:"Kerry", imgUrl:"sea.jpg",  text:"first content"}}
                                />
                                
                                <ContentCard 
                                    contentInfor={{name:"Jenna", imgUrl:"sea.jpg", text:"first content"}}
                                />

                                <ContentCard 
                                    contentInfor={{name:"Alexender", imgUrl:"sea.jpg", text:"first content"}}
                                />
                                <ContentCard 
                                    contentInfor={{name:"Kerry", imgUrl:"sea.jpg", text:"first content"}}
                                />

                                <ContentCard 
                                    contentInfor={{name:"Walter", imgUrl:"sea.jpg", text:"first content"}}
                                />
                            </div>
                        </section>

                        {/* 세번째 */}
                        <section className="WP_section3">
                            <p className="underline">간편식<br/>
                           
                            </p>
                            <div className="WP_sectionarea">
                             
                            <ContentCard 
                                    contentInfor={{name:"John", imgUrl:"sea.jpg", text:"first content"}}
                                />

                                <ContentCard 
                                    contentInfor={{name:"Kerry", imgUrl:"sea.jpg",  text:"first content"}}
                                />
                                
                                <ContentCard 
                                    contentInfor={{name:"Jenna", imgUrl:"sea.jpg", text:"first content"}}
                                />

                                <ContentCard 
                                    contentInfor={{name:"Alexender", imgUrl:"sea.jpg", text:"first content"}}
                                />
                                <ContentCard 
                                    contentInfor={{name:"Kerry", imgUrl:"sea.jpg", text:"first content"}}
                                />

                                <ContentCard 
                                    contentInfor={{name:"Walter", imgUrl:"sea.jpg", text:"first content"}}
                                />
                            </div>
                        </section>

                        {/* 네번째 */}
                        <section className="WP_section4">
                            <p className="underline">반찬<br/>
                            
                            </p>
                            
                            <div className="WP_sectionarea">
                                <ContentCard 
                                    contentInfor={{name:"John", imgUrl:"sea.jpg", text:"first content"}}
                                />

                                <ContentCard 
                                    contentInfor={{name:"Kerry", imgUrl:"sea.jpg",  text:"first content"}}
                                />
                                
                                <ContentCard 
                                    contentInfor={{name:"Jenna", imgUrl:"sea.jpg", text:"first content"}}
                                />

                                <ContentCard 
                                    contentInfor={{name:"Alexender", imgUrl:"sea.jpg", text:"first content"}}
                                />
                                <ContentCard 
                                    contentInfor={{name:"Kerry", imgUrl:"sea.jpg", text:"first content"}}
                                />

                                <ContentCard 
                                    contentInfor={{name:"Walter", imgUrl:"sea.jpg", text:"first content"}}
                                />
                            </div>
                        </section>

                         {/* 풋터*/}
                        <footer className="WP_footerArea">
                            <div className="WP_footerContent">
                                <div className="footer_Thumnail">
                                    Footer
                                </div>
                                <div className="footer_down">
                                    <p className="underword">
                                        (주)모리아타운 05854 서울특별시 송파구 법원로 114(문정동) B동 915호</p>
                                    <p className="underword">
                                        대표자:권오형 ㅣ 개인정보관리: 정원석</p>
                                    <p className="underword">
                                        사업자번호:000-00-00000 통신판매업 신고 : 0000-서울송파-0000호</p>
                                    <p className="underword">
                                        대표전화 : 0000-0000 대표메일 : abc123@moriahtown.com</p>
                                    <p className="underword">서비스관련 문의</p>
                                    <p className="underword">@2020 Moriahtown. All Rights Reserved.</p>
                                </div>
                            </div>
                        </footer>


                       
                    </div>
                </div>
            </div>
        </>
    );
};

export default WidePage;