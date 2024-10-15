import React from "react";

const Logo = ({ className }: { className?: string }) => {
  return (
    //     <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    // <path fillRule="evenodd" clipRule="evenodd" d="M36 72C55.8823 72 72 55.8823 72 36C72 16.1177 55.8823 0 36 0C16.1177 0 0 16.1177 0 36C0 55.8823 16.1177 72 36 72ZM36.9989 30.9784L36 4L35.0011 30.9784L23.7541 6.43586L33.1555 31.7429L13.3726 13.3726L31.7429 33.1555L6.43586 23.7541L30.9784 35.0011L4 36L30.9784 36.9989L6.43586 48.2459L31.7429 38.8445L13.3726 58.6274L33.1555 40.2571L23.7541 65.5641L35.0011 41.0216L36 68L36.9989 41.0216L48.2459 65.5641L38.8445 40.2571L58.6274 58.6274L40.2571 38.8445L65.5641 48.2459L41.0216 36.9989L68 36L41.0216 35.0011L65.5641 23.7541L40.2571 33.1555L58.6274 13.3726L38.8445 31.7429L48.2459 6.43586L36.9989 30.9784Z" fill="black"/>
    // </svg>

    <img
      width="48"
      height="48"
      src="https://img.icons8.com/color-glass/48/ghost.png"
      alt="ghost"
    />
  );
};

export default Logo;
