import React from 'react';
import { Handle } from 'rc-slider';

const HandleSlider = (props) => {
  const { value, dragging, index, ...rest } = props;
  return (
    <Handle key={index} value={value} {...rest}>
      {dragging && { value }}
    </Handle>
  );
};

export default HandleSlider;
