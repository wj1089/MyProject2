import React from 'react';

const DownImg = () => {
    return (
        <div>
            <HoverImage 
            className="section_link_4" 
            onClick={handleClick}
            src={greenDown}
            hoverSrc={whiteDown}
            alt="아이그레 다운링크 로고"
            />
        </div>
    );
};

export default DownImg;