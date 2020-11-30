import React from 'react';
import './ContentCard.css'
import '../WidePage/WidePage.css'

function ContentCard(props) {

    console.log(props);
    
    return (
        <div>
                {/* <div className="WP_sectionimgs">
                    <div>
                        <img className="WP_imgSize" src={props.contentInfor.imgUrl}/>
                    </div>
                    <div className="WP_contentText">
                        <p>Name : {props.contentInfor.name}</p>
                        <p>Text : {props.contentInfor.text}</p>
                    </div>

                </div> */}
                </div>
    );
};

export default ContentCard;