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
  const [filePDF, setFilePDF] = useState<File | null>(null);
  const [epubFile, setEpubFile] = useState<File | null>(null);
  const [urlEPUB, setUrlEPUB] = useState(null);
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

  return (
    <div className="App">
      <FileUploader onFileChange={handleFileChange} />
      {filePDF && filePDF?.type === 'application/pdf' && <PdfReactPdf src={URL.createObjectURL(filePDF)} />}
      {epubFile && epubFile.name.endsWith('.epub') && <EpubReader src={urlEPUB || ""} />}
    </div>
  );
}
