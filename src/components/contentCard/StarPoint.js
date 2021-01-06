import React, { useEffect, useState } from 'react';
import '../../styles/cssfiles/CssFolder';
import PropTypes from 'prop-types';

const StarPoint = ({ point }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const maxCount = 5;
    const numberToPoint = Number(point).toFixed(1);
    const halfStar = Math.round(numberToPoint % 1);
    const drawStar = Math.floor(numberToPoint);
    const blankStar = maxCount - halfStar - drawStar;
    const starList = {
      draw: drawStar,
      half: halfStar,
      blank: blankStar,
    };
    setCount(starList);
  }, [point]);

  return (
    <>
      <div className="rv-iconArea">
        {Array(count.draw)
          .fill(null)
          .map(() => (
            <span className="fas fa-star" />
          ))}

        {Array(count.half)
          .fill(null)
          .map(() => (
            <span className="fas fa-star-half" />
          ))}

        {Array(count.blank)
          .fill(null)
          .map(() => (
            <span className="fas fa-star" style={{ color: '#e0e0e0' }} />
          ))}

        <p className="pointNumber" style={{ fontSize: '15px' }}>
          {Number(point).toFixed(1)}
        </p>
      </div>
    </>
  );
};

export default StarPoint;

StarPoint.propTypes = {
  point: PropTypes.number.isRequired,
};

StarPoint.defaultTypes = {
  point: 5,
};
