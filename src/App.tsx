import React, { useState } from 'react';
import "./styles.css";
// import PdfTagIFrame from "./components/PdfTagIFrame";
// import PdfTagEmbed from "./components/PdfTagEmbed";
// import PdfTagObject from "./components/PdfTagObject";
// import PdfJs from "./components/PdfJs";
import EpubReader from "./components/EpubReader";
import PdfReactPdf from "./components/PdfReactPdf";
import FileUploader from './components/FileUploader';

export default function App() {
  const [bgColor, setBgColor] = useState<string>("#333");
  const [filePDF, setFilePDF] = useState<File | null>(null);
  const [epubFile, setEpubFile] = useState<File | null>(null);
  const [urlEPUB, setUrlEPUB] = useState(null);
  const [epubIframe, setIsEpubIframe] = useState(false);
  const handleFileChange = (e: any) => {
    const uploadedFile = e.target.files[0];
    if(uploadedFile?.name.endsWith(".epub")){
      handleFileChangeEPUB(e);
      setFilePDF(null);
    }else{
      setFilePDF(uploadedFile);
      setEpubFile(null);
      setUrlEPUB(null);
    }
  };

  const handleFileChangeEPUB = (e: any) => {
    const file = e.target.files[0];

    setEpubFile(file);

    const reader = new FileReader();
    reader.onload = (e: any) => {
      setUrlEPUB(e?.target?.result);
    };
    reader.readAsArrayBuffer(file);
  };

  const handleEpubToggle = (p: boolean) => {
    setFilePDF(null);
    setIsEpubIframe(p)
  }
  const handleBgColorChg = (e: any) => {
    setBgColor(e.target.value);
    setFilePDF(null);
  }

  return (
    <div className="App" style={{backgroundColor: bgColor}}>
      <div className="flex-gap">
        <span style={{backgroundColor: "white"}}>BG Color</span>
        <input type="color" name="bgcolor" id="bgcolor" value={bgColor} onChange={handleBgColorChg} />
      </div>
      <FileUploader onFileChange={handleFileChange} setIsEpubIframe={(p: boolean) => handleEpubToggle(p)} epubIframe={epubIframe} />
      {filePDF && filePDF?.type === 'application/pdf' && <PdfReactPdf src={URL.createObjectURL(filePDF)} />}
      {epubFile && epubFile.name.endsWith('.epub') && <EpubReader src={urlEPUB || ""} />}
      {epubIframe && <iframe src="https://app.flowoss.com/" frameBorder="0"
        style={{
          width: "85vw",
          margin: 0,
          padding: 0,
          height: "80vh"
        }}
        allowFullScreen
      />}
    </div>
  );
}
