import React from 'react';
import '../navigation/Navigation.css'
import logo from '../../resource/logo_sb.png'
import { useHistory } from 'react-router-dom';

const MenuBar = () => {

const history =useHistory();

    return (
        <>
                <header className="nav_menubar">
                    
                        <ul className="nav_menu"> 
                            <div className="logoArea"  onClick={()=>{history.push('/Landing')}}>
                                <img src={logo} className="logo"/>
                            </div>
                            <li className="one">브랜드소개</li>
                            <li className="two" onClick={()=>{history.push('/WidePage')}}>상품소개</li>
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