
import React from 'react';

export const Logo: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg 
    viewBox="0 0 300 80" 
    xmlns="http://www.w3.org/2000/svg" 
    {...props}
  >
    <style>
      {`
        .logo-text { font-family: 'Playfair Display', serif; font-size: 60px; font-weight: 400; }
      `}
    </style>
    <text
      x="50%"
      y="50%"
      dominantBaseline="middle"
      textAnchor="middle"
      fill="currentColor"
      className="logo-text"
    >
      e-Stylist
    </text>
  </svg>
);
