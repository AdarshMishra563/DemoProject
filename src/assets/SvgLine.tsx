import React from 'react';
import { View } from 'react-native';
import Svg, { Line, Circle } from 'react-native-svg';

const SymmetricalCircleLines = ({ size = 23, color = '#000', strokeWidth = 2 }) => {
  const segmentWidth = size / 4;
  const circlePos = size / 2;
  const circleRadius = size / 8;
  const lineY = size / 3;

  return (
    <View style={{ alignItems: 'center' }}>
      {/* Top Line: -o-- (circle at 1/4 width) */}
      <Svg width={size} height={size/2} viewBox={`0 0 ${size} ${size/2}`}>
        {/* Left line segment */}
        <Line 
          x1="0" y1={lineY} 
          x2={segmentWidth - circleRadius+2} y2={lineY} 
          stroke={color} strokeWidth={strokeWidth} 
        />
        {/* Right line segment */}
        <Line 
          x1={segmentWidth + circleRadius+2} y1={lineY} 
          x2={size} y2={lineY} 
          stroke={color} strokeWidth={strokeWidth} 
        />
        {/* Circle */}
        <Circle 
          cx={segmentWidth+2} cy={lineY} r={circleRadius} 
          stroke={color} strokeWidth={strokeWidth} 
          fill="transparent" 
        />
      </Svg>

      {/* Bottom Line: --o- (circle at 3/4 width) */}
      <Svg width={size} height={size/2} viewBox={`0 0 ${size} ${size/2}`}>
        {/* Left line segment */}
        <Line 
          x1="0" y1={lineY} 
          x2={3*segmentWidth - circleRadius-2} y2={lineY} 
          stroke={color} strokeWidth={strokeWidth} 
        />
        {/* Right line segment */}
        <Line 
          x1={3*segmentWidth + circleRadius-2} y1={lineY} 
          x2={size} y2={lineY} 
          stroke={color} strokeWidth={strokeWidth} 
        />
        {/* Circle */}
        <Circle 
          cx={3*segmentWidth-2} cy={lineY} r={circleRadius} 
          stroke={color} strokeWidth={strokeWidth} 
          fill="transparent" 
        />
      </Svg>
    </View>
  );
};

export default SymmetricalCircleLines;