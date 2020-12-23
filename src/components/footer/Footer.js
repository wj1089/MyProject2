import React from 'react';
import "../../styles/cssfiles/CssFolder.js"
import * as urls from "../cabinet/urls";

const Footer = () => {

    function clickLink(e) {
        e.preventDefault();
        window.open(urls.fairTrade);
      }

    return (
        <>
            <footer className="full_footer">
                    <p className="underword">
                        주식회사 모리아타운<br/>
                        05854 서울특별시 송파구 법원로 114(문정동) B동 915호
                    </p>

                    <p className="underword">
                        대표자:권오형 ㅣ 개인정보관리: 정원석</p>
                        {/* style={{ textDecoration: 'none', outline: 'none' }} */}
                    <p className="underword"  >
                        사업자번호:215-86-89431 <br/>
                        통신판매업 신고 : 2011-서울송파-1572호
                        <a className="fairTrade"onClick={clickLink}>
                            (통신판매업조회)
                        </a>
                    </p>
                    <p className="underword">
                        서비스관련 문의/입점문의<br/>
                        대표전화 : 02-414-7077 <br/>
                        대표메일 : igre@moriahtown.com
                    </p>
                    <p className="underword">
                        @2020 Moriahtown. All Rights Reserved.
                    </p>
            </footer>
        </>
    );
};

export default Footer;