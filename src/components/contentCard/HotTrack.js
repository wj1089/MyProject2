import React from 'react';
import './ContentCard.css'

const HotTrack = (props) => {
    return (
             <div className="HT_sectionimgs">
                   
                   <img className="HT_imgSize" src={props.hottrackInfor.imgUrl}/>
                   
                   <div className="HT_contentText">
                       <h4>Name : {props.hottrackInfor.name}</h4>
                       <p>Text : {props.hottrackInfor.text}</p>
                   </div>

               </div>
    );
};

export default HotTrack;