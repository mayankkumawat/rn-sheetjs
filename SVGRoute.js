// SVGRoute.js
import React from 'react';
import {Svg, Path} from 'react-native-svg';

const SVGRoute = ({index}) => {
  const d = `M10 ${index * 60 + 30} C 20 ${index * 60 + 30}, 40 ${
    index * 60 + 30
  }, 50 ${index * 60 + 60}`;

  return (
    <Svg height="100" width="100">
      <Path d={d} stroke="purple" strokeWidth="4" fill="none" />
    </Svg>
  );
};

export default SVGRoute;
