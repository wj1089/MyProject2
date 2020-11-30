import React from 'react';
import '../navigation/Navigation.css'
import logo from '../../resource/logo_sb.png'
import { useHistory } from 'react-router-dom';

const MenuBar = () => {

const history =useHistory();

    return (
        <>
                <header className="nav_menubar">
                    <div className="logoArea"  onClick={()=>{history.push('/Landing')}}>
                        <img src={logo} className="logo"/>
                    </div>

                    <ul className="nav_menu">
                        <li><a className="one">브랜드소개</a></li>
                       
                        <li><a className="two" onClick={()=>{history.push('/WidePage')}}>상품보기</a></li>
                        
                        {/* <li><a>Delivery</a></li>
                        <li><a>Comment</a></li>
                        <li><a>News</a></li> */}
                        {/* className="introMunu"
                        className="productMunu" */}
                    </ul>
            </header>
        </>
    );
};

export default MenuBar;