import React from 'react';
import '../navigation/Navigation.css'
import logo from '../../resource/logo_sb.png'
import { useHistory } from 'react-router-dom';

const MenuBar = () => {

const history =useHistory();

    return (
        <>
            <header>
                <nav className="nav_menu">
                    <ul>
                        <li className="logoArea">
                            <img src={logo} className="logo" />
                        </li>
                        <li className="one">브랜드소개</li>
                        <li className="two">상품소개</li>

                        {/* onClick={()=>{history.push('/WidePage')}} 
                                                    */}
                        {/* <li><a>Delivery</a></li>
                        <li><a>Comment</a></li>
                        <li><a>News</a></li> */}
                        {/* className="introMunu"
                        className="productMunu" */}
                        </ul>
                    </nav>
            </header>
        </>
    );
};

export default MenuBar;