import React, { useState } from "react";
import "./styles/App.css";
import QRCode from "react-qr-code";

const App = () => {
  const [data, setData] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setData(event.target.value);
  };

  const handleOnClickDownloadBtn = () => {
    const svg = document.getElementById("qr-code") as HTMLElement;
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const image = new Image();
    image.onload = () => {
      canvas.width = image.width;
      canvas.height = image.height;
      ctx?.drawImage(image, 0, 0);
      const pngFile = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.download = "QRCode";
      downloadLink.href = `${pngFile}`;
      downloadLink.click();
    };
    image.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
  };

  return (
    <div className="container">
      <QRCode id="qr-code" value={data} />
      <form className="data-form">
        <input type="text" value={data} onChange={handleInputChange} />
      </form>
      <button
        type="button"
        className="btn-download"
        onClick={handleOnClickDownloadBtn}
      >
        Download to image
      </button>
    </div>
  );
};

export default App;
