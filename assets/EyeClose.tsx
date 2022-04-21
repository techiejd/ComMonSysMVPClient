import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const EyeClose=({props}:any)=> {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="30px"
      height="30px"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#34D399"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <Path d="M2 10s3.5 4 10 4 10-4 10-4"></Path>
      <Path d="M4 11.645L2 14"></Path>
      <Path d="M22 14l-1.996-2.352"></Path>
      <Path d="M8.914 13.68L8 16.5"></Path>
      <Path d="M15.063 13.688L16 16.5"></Path>
    </Svg>
  );
}

export default EyeClose;
  