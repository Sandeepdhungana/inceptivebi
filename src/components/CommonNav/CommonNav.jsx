import React, { useState } from "react";
import TopNavBar from "../TopNavBar/TopNavBar";

const CommonNav = ({ children,currentUrl }) => {
  
  return (
    <>
      
      {currentUrl && (
        <iframe
          src={currentUrl}
          title="iframe"
          style={{ width: "100%", height: "100vh", overflow:"hidden" }}
        ></iframe>
      )}
      {children}
    </>
  );
};

export default CommonNav;
