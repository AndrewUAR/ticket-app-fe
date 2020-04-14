import React from 'react';
import PropTypes from 'prop-types';

const Box = props => {
  const {
    cardValue,
    title, 
    iconClass,
    cardValueClass
  } = props;

  return (
    <>
      <div className="col-md-6 col-xl-4">
        <div className="card-box border">
          <i className={`${iconClass} font-24`}></i>
          <h3 className={cardValueClass}>{cardValue}</h3>
          <p className="text-uppercase font-13 font-weight-medium mb-1">{title}</p>
        </div>
      </div>
    </>
  )
}

Box.propTypes = {
  title: PropTypes.string,
  cardValue: PropTypes.any,
  iconClass: PropTypes.string
}

export default Box;
