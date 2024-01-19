import React, { useState, useEffect } from "react";
import "../CSS/Upload.css";

function Upload() {
  const [files, setFiles] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  const [maxDownloads, setMaxDownloads] = useState("none");
  const [timeToLive, setTimeToLive] = useState("24 Hours");
  const [security, setSecurity] = useState("None");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const preventDefault = (e) => {
      e.preventDefault();
    };

    window.addEventListener("dragover", preventDefault);
    window.addEventListener("drop", preventDefault);

    return () => {
      window.removeEventListener("dragover", preventDefault);
      window.removeEventListener("drop", preventDefault);
    };
  }, []);

  const formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  };

  const calculateTotalSize = () => {
    const totalBytes = files.reduce((total, file) => {
      if (file.selected) {
        console.log("Adding size:", file.sizeInBytes); // Debugging log
        return total + file.sizeInBytes;
      } else {
        return total;
      }
    }, 0);

    console.log("Total size in bytes:", totalBytes); // Debugging log
    return formatBytes(totalBytes);
  };

  const isAnyFileSelected = () => {
    return files.some((file) => file.selected);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const newFiles = e.dataTransfer.files;
    if (newFiles) {
      handleFiles(newFiles);
    }
  };

  const handleChange = (e) => {
    const newFiles = e.target.files;
    if (newFiles) {
      handleFiles(newFiles);
    }
  };

  const fileIcons = {
    "3GP": "3GP.png",
    AI: "AI.png",
    APK: "APK.png",
    AVI: "AVI.png",
    BIN: "BIN.png",
    BMP: "BMP.png",
    C: "C.png",
    CDR: "CDR.png",
    CPP: "CPP.png",
    CS: "CS.png",
    CSS: "CSS.png",
    DMG: "DMG.png",
    DMP: "DMP.png",
    DOC: "DOC.png",
    DOCX: "DOCX.png",
    EPS: "EPS.png",
    EPUB: "EPUB.png",
    EXE: "EXE.png",
    FLAC: "FLAC.png",
    GIF: "GIF.png",
    H: "H.png",
    HEIC: "HEIC.png",
    HTML: "HTML.png",
    ICO: "ICO.png",
    ISO: "ISO.png",
    JAR: "JAR.png",
    JAVA: "JAVA.png",
    JS: "JS.png",
    M4A: "M4A.png",
    MKV: "MKV.png",
    MOV: "MOV.png",
    MP3: "MP3.png",
    MP4: "MP4.png",
    MSI: "MSI.png",
    OGG: "OGG.png",
    OTF: "OTF.png",
    PDF: "PDF.png",
    PHP: "PHP.png",
    PPT: "PPT.png",
    PPTX: "PPTX.png",
    PRPROJ: "PRPROJ.png",
    PSD: "PSD.png",
    PY: "PY.png",
    RAR: "RAR.png",
    RSS: "RSS.png",
    RTF: "RTF.png",
    SH: "SH.png",
    SVG: "SVG.png",
    TAR: "TAR.png",
    TIFF: "TIFF.png",
    TTF: "TTF.png",
    TXT: "TXT.png",
    VB: "VB.png",
    WAV: "WAV.png",
    WMA: "WMA.png",
    WMV: "WMV.png",
    WSF: "WSF.png",
    XHTML: "XHTML.png",
    XLS: "XLS.png",
    XLSM: "XLSM.png",
    XLSX: "XLSX.png",
    XML: "XML.png",
    COMPRESSED: "COMPRESSED.png",
    // Default icon for unlisted file types
    DEFAULT: "FILE.png",
  };

  const compressedFileExtensions = [
    "7Z",
    "ZIP",
    "GZ",
    "BZ2",
    "LZ",
    "LZMA",
    "LZO",
    "XZ",
    "Z",
    "ZST",
    "ARJ",
    "TAR.GZ",
    "TGZ",
    "TAR.BZ2",
    "TBZ",
    "TBZ2",
    "TAR.LZ",
    "TLZ",
    "TAR.LZMA",
    "TAR.LZO",
    "TAR.XZ",
    "TXZ",
    "TAR.Z",
    "TAR.ZST",
    "WAR",
    "EAR",
    "PKG",
    "DEB",
    "RPM",
    "VHD",
    "DAA",
  ];

  const handleFiles = (newFiles) => {
    const mappedFiles = Array.from(newFiles).map((file) => {
      let previewURL = null;

      if (file.type.startsWith("image/")) {
        previewURL = URL.createObjectURL(file);
      } else {
        const extension = file.name.split(".").pop().toUpperCase();

        if (compressedFileExtensions.includes(extension)) {
          previewURL =
            process.env.PUBLIC_URL + "/Images/File-Icons/COMPRESSED.png";
        } else {
          const iconFileName = fileIcons[extension] || fileIcons["DEFAULT"];
          previewURL =
            process.env.PUBLIC_URL + "/Images/File-Icons/" + iconFileName;
        }
      }

      return {
        name: file.name,
        size: formatBytes(file.size),
        sizeInBytes: file.size,
        selected: false,
        previewURL,
      };
    });

    Promise.all(mappedFiles).then((result) => {
      setFiles((prevFiles) => [...prevFiles, ...result]);
    });
  };

  const toggleFileSelection = (index) => {
    setFiles((prevFiles) =>
      prevFiles.map((file, i) =>
        i === index ? { ...file, selected: !file.selected } : file
      )
    );
  };

  const toggleSelectAll = () => {
    const allSelected = files.every((file) => file.selected);
    setFiles(files.map((file) => ({ ...file, selected: !allSelected })));
  };

  const formatFileName = (name) => {
    const extension = name.split(".").pop();
    const baseName = name.substring(0, name.lastIndexOf("."));
    const truncatedBaseName =
      baseName.length > 8 ? baseName.substring(0, 8) + "..." : baseName;
    return `${truncatedBaseName}.${extension}`;
  };

  const dummyUploadFiles = () => {
    // Check if the password security option is selected and no password is entered
    if (security === "Password" && password === "") {
      alert("Please enter a password to upload the file(s).");
      return; // Prevent further execution of the function
    }

    // Check if any file is selected
    if (isAnyFileSelected()) {
      // Displaying a message to the user
      alert("Sending selected file(s) to the server...");

      // Make an API call to your server
      console.log(
        "Files to upload:",
        files.filter((file) => file.selected)
      );

      // Redirect to the Uploaded page
      window.location.href = "./Uploaded";
    } else {
      alert("Please select at least one file to upload.");
    }
  };

  const settingsBox = files.length > 0 && (
    <div className="settings-container">
      <div className="setting">
        <label>Max number of downloads</label>
        <select
          value={maxDownloads}
          onChange={(e) => setMaxDownloads(e.target.value)}
        >
          <option value="infinity">Infinity</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </div>
      <div className="setting">
        <label>Time to live</label>
        <select
          value={timeToLive}
          onChange={(e) => setTimeToLive(e.target.value)}
        >
          <option value="1 Hour">1 Hour</option>
          <option value="3 Hours">3 Hours</option>
          <option value="8 Hours">8 Hours</option>
          <option value="12 Hours">12 Hours</option>
          <option value="24 Hours">24 Hours</option>
        </select>
      </div>
      <div className="setting">
        <label>Security</label>
        <div>
          <input
            type="radio"
            id="none"
            name="security"
            value="None"
            checked={security === "None"}
            onChange={() => setSecurity("None")}
          />
          <label htmlFor="none">None</label>
          <input
            type="radio"
            id="password"
            name="security"
            value="Password"
            checked={security === "Password"}
            onChange={() => setSecurity("Password")}
          />
          <label htmlFor="password">Password</label>
          {security === "Password" && (
            <div className="password-container">
              <input
                type={showPassword ? "text" : "password"}
                className="password-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
              />
              <button
                type="button"
                className="peek-button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Unpeek" : "Peek"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="upload-container">
      <div>
        <a href="./home" className="kite-link">
          KITE
        </a>
        <button
          onClick={() => (window.location.href = "./Upload")}
          className="Upload-button"
        >
          Upload
        </button>
      </div>
      <form
        className={`drop-zone ${dragActive ? "active" : ""}`}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
      >
        <input
          id="file-upload"
          type="file"
          className="file-input"
          onChange={handleChange}
          multiple
        />
        <div className="drop-message">
          Drag and drop files here or{" "}
          <label htmlFor="file-upload" className="upload-link">
            browse
          </label>
        </div>
        {files.length > 0 && (
          <div>
            <div className="select-all">
              <input
                type="checkbox"
                onChange={toggleSelectAll}
                checked={files.every((file) => file.selected)}
              />
              Select All
            </div>
            <div className="file-display-container">
              {files.map((file, index) => (
                <div className="file-status-bar" key={index}>
                  <input
                    type="checkbox"
                    checked={file.selected}
                    onChange={() => toggleFileSelection(index)}
                  />
                  {file.previewURL && (
                    <img
                      src={file.previewURL}
                      alt="Preview"
                      style={{ width: "50px", height: "50px" }}
                    />
                  )}
                  <div className="file-info">
                    <span className="file-name" title={file.name}>
                      {formatFileName(file.name)}
                    </span>
                    <span className="file-size">({file.size})</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </form>
      {files.length > 0 && (
        <>
          {settingsBox} {/* Settings Box will appear here */}
          <div className="totalsize">
            Total Selected Size:{" "}
            <span className="total-size-color">{calculateTotalSize()}</span>
          </div>
          <button onClick={dummyUploadFiles}>Upload</button>
        </>
      )}
    </div>
  );
}
export default Upload;
