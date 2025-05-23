import * as React from "react";

const GermanFlag: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    className="iconify iconify--twemoji"
    viewBox="0 0 36 36"
    {...props}
  >
    <g id="SVGRepo_iconCarrier">
      <path
        fill="#FFCD05"
        d="M0 27a4 4 0 0 0 4 4h28a4 4 0 0 0 4-4v-4H0z"
      ></path>
      <path fill="#ED1F24" d="M0 14h36v9H0z"></path>
      <path
        fill="#141414"
        d="M32 5H4a4 4 0 0 0-4 4v5h36V9a4 4 0 0 0-4-4"
      ></path>
    </g>
  </svg>
);

export default GermanFlag;
