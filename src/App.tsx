import React, { useState } from 'react';
import "./styles.css";
// import PdfTagIFrame from "./components/PdfTagIFrame";
// import PdfTagEmbed from "./components/PdfTagEmbed";
// import PdfTagObject from "./components/PdfTagObject";
// import PdfJs from "./components/PdfJs";
import PdfReactPdf from "./components/PdfReactPdf";
import FileUploader from './components/FileUploader';

// const pdfUrl = "/compressed.tracemonkey-pldi-09.pdf";
// "https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf";

export default function App() {
  const [file, setFile] = useState<File | null>(null);
  const handleFileChange = (uploadedFile: React.SetStateAction<File | null>) => {
    setFile(uploadedFile);
  };

  return (
    <div className="App">
      {/* <h2>Utilize PDF.js library to embed PDF on your React!</h2>
      <div className="pdf-container">
        <PdfJs src={pdfUrl} />
      </div> */}
      <FileUploader onFileChange={handleFileChange} />
      {file && file?.type === 'application/pdf' && <PdfReactPdf src={URL.createObjectURL(file)} />}
      {/* {file && file.name.endsWith('.epub') && <EPUBViewer file={file} />} */}
      {/* <h2>Utilize React-PDF library to embed PDF on your React!</h2>
      <div className="pdf-container">
        <PdfReactPdf src={pdfUrl} />
      </div> */}
    </div>
  );
}
