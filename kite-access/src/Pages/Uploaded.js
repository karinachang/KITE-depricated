import React, { useState, useEffect } from "react";
import QRCode from "qrcode.react";
import "../CSS/Uploaded.css";

const Uploaded = () => {
  const [code, setCode] = useState("318278");
  const [showQR, setShowQR] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploadComplete, setUploadComplete] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          clearInterval(interval);
          setUploadComplete(true);
          return 100;
        }
        return Math.min(oldProgress + 20, 100); // increment by 20% every second
      });
    }, 1000); // 1000 milliseconds = 1 second

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  const copyCodeToClipboard = () => {
    navigator.clipboard.writeText(code);
    alert("Code copied to clipboard!");
  };

  const copyLinkToClipboard = () => {
    const baseUrl = window.location.origin;
    navigator.clipboard.writeText(`${baseUrl}/${code}`);
    alert("Link copied to clipboard!");
  };

  const toggleQRCode = () => {
    setShowQR(!showQR);
  };

  const getLink = () => {
    return `${window.location.origin}/${code}`;
  };

  return (
    <div className="upload-container">
      <header className="App-header">
        <a href="./home" className="kite-link">
          KITE
        </a>
        <button
          onClick={() => (window.location.href = "./Upload")}
          className="Upload-button"
        >
          Upload
        </button>
      </header>
      <div className="progress-bar">
        <div
          className={`progress ${uploadComplete ? "progress-complete" : ""}`}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      {!uploadComplete && (
        <div className="upload-message">
          Please do not reload the page. Upon uploading a code will be
          generated.
        </div>
      )}
      {uploadComplete && (
        <>
          <div className="code-box">{code}</div>
          {showQR && <QRCode value={getLink()} />}
          <div className="button-container">
            <button onClick={copyCodeToClipboard}>Copy</button>
            <button onClick={copyLinkToClipboard}>Get sharable link</button>
            <button onClick={toggleQRCode}>Generate QR Code</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Uploaded;
