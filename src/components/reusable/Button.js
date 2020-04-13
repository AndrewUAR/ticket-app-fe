import React from 'react';
import PropTypes from 'prop-types';

const Button = props => {

  const { label, type, className, handleClick, disabled } = props;

  return (
    <>
      <button
        type={type}
        className={className}
        onClick={handleClick}
        disabled={disabled}
      >
        {label}
      </button>
    </>
  )
}

Button.propTypes = {
  type: PropTypes.string,
  className: PropTypes.string
}

export default Button;
