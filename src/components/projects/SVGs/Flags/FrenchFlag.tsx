import * as React from "react";

const FrenchFlag: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    className="iconify iconify--twemoji"
    viewBox="0 0 36 36"
    {...props}
  >
    <g id="SVGRepo_iconCarrier">
      <path
        fill="#ED2939"
        d="M36 27a4 4 0 0 1-4 4h-8V5h8a4 4 0 0 1 4 4z"
      ></path>
      <path fill="#002495" d="M4 5a4 4 0 0 0-4 4v18a4 4 0 0 0 4 4h8V5z"></path>
      <path fill="#EEE" d="M12 5h12v26H12z"></path>
    </g>
  </svg>
);

export default FrenchFlag;
