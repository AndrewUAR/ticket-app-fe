import React from 'react';
import PropTypes from 'prop-types';

const Button = props => {

  const { label, type, className, handleClick } = props;

  return (
    <>
      <button
        type={type}
        className={className}
        onClick={handleClick}
      >
        {label}
      </button>
    </>
  )
}

Button.propTypes = {
  type: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func.isRequired
}

export default Button;
