import React from 'react';
import PropTypes from 'prop-types';
import '../styling/spinner.css';

export default function Spinner(
  {width = '100%', height, thickness, color, className}
) {

  const spnrStyle = {
    display: 'inline-block',
    border: `${thickness} solid rgba(255, 255, 255, 0.3)`,
    borderTop: `${thickness} solid ${color}`,
    borderRadius: '50%',
    width: height,
    height,
    animation: 'spinner 1.5s linear infinite',
  }

  const ctnrStyle = {
    width,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }

  return (
    <div style={ctnrStyle}>
      <div className={className} style={spnrStyle} ></div>
    </div>
  );
}

Spinner.propTypes = {
  size: PropTypes.string,
  thickness: PropTypes.string,
  color: PropTypes.string
}

Spinner.defaultProps = {
  height: '30px',
  thickness: '3px',
  color: '#FFFFFF',
  className: '_spinner'
}