import React from 'react';
import './BigCategory.css';
import '../main/Landing.css';
import { useHistory } from 'react-router-dom';

import MenuBar from '../navigation/MenuBar';
// import SideNav from '../navigation/SideNav';


const BigCategory = () => {

    function handleClick(e){
        e.preventDefault();
        console.log("The link was Clicked!!")
    }

    return (
        <>
            <div className="BC_main_fullscreen">

                {/* 상단 메뉴 */}
                <MenuBar/>

                <div className="BC_main_contant">
                
                {/* 사이드바 */}
                    <div className="BC_sidenav">
                        {/* <SideNav/> */}
                    </div>

                {/* 전체 메인영역 */}
                    <div className="BC_section_fullarea">

                        {/* 현 페이지 */}
                        <div>Home . Men . Bag . ~~</div>

                        {/* 상단부 */}
                        <section className="BC_section1">
                            <p className="underline">First content</p>

                            <div className="BC_sectionarea">
                                <div className="BC_sectionimgs">
                                    <div className="BC_sectionimgs .size">이미지</div>
                                </div>
                                <div className="BC_sectionimgs">
                                    <div className="BC_sectionimgs .size">이미지</div>
                                </div>
                                <div className="BC_sectionimgs">
                                    <div className="BC_sectionimgs .size">이미지</div>
                                </div>
                                <div className="BC_sectionimgs">
                                    <div className="BC_sectionimgs .size">이미지</div>
                                </div>
                                <div className="BC_sectionimgs">
                                    <div className="BC_sectionimgs .size">이미지</div>
                                </div>
                            </div>

                        </section>
                        {/* 하단부 */}
                        <section className="BC_section2">
                            <p className="underline">Second content</p>

                            <div className="BC_sectionarea">
                                <div className="BC_sectionimgs">
                                    <div className="BC_sectionimgs .size">이미지</div>
                                </div>
                                <div className="BC_sectionimgs">
                                    <div className="BC_sectionimgs .size">이미지</div>
                                </div>
                                <div className="BC_sectionimgs">
                                    <div className="BC_sectionimgs .size">이미지</div>
                                </div>
                                <div className="BC_sectionimgs">
                                    <div className="BC_sectionimgs .size">이미지</div>
                                </div>
                                <div className="BC_sectionimgs">
                                    <div className="BC_sectionimgs .size">이미지</div>
                                </div>
                            </div>
                        </section>                 
                      
                    </div>
                </div>
            </div>
        </>
    );
};

export default BigCategory;