import React from "react";
import { useLocation } from "react-router-dom";

const DataModelling = () => {
  const location = useLocation();
  const iframeUrl = location.state?.iframeUrl;

  return (
    <div>
      {iframeUrl ? (
        <iframe src={iframeUrl} width="100%" height="100%" title="iFrame" />
      ) : (
        <p>No URL provided</p>
      )}
    </div>
  );
};

export default DataModelling;
