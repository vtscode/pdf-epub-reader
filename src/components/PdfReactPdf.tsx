import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";
import { useState } from "react";
import { Document, Page } from "react-pdf";
import { PdfProps } from "../types";
import { pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function PdfReactPdf({ src }: PdfProps) {
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [scale, setScale] = useState<number>(0.6);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  function nextPage() {
    setPageNumber((v) => ++v);
  }

  function prevPage() {
    setPageNumber((v) => --v);
  }

  const handleChangeSlider = (e: any) => {
    setPageNumber(parseInt(e.target.value));
  }
  const handleChangeVal = (e: any) => {
    setPageNumber(parseInt(e.target.value));
  }
  const handleChangeScale = (e: any) => {
    setScale(e);
  }

  return (
    <div style={{ display: "grid", height: "100%", alignItems: "center", justifyContent: "center", gap: "8px", margin: "10px 0px 0px 0px" }}>
      <div style={{ display: "flex", height: "100%", alignItems: "center", justifyContent: "center", gap: "8px" }}>
        <button onClick={prevPage} disabled={pageNumber <= 1}>
          {"<<<"}
        </button>
        <p style={{margin: 0,backgroundColor: "white"}}>
          Page 
          <input
            name="pageNumberUpper"
            type="number"
            min="1"
            max={numPages}
            value={pageNumber}
            onChange={(e) => handleChangeVal(e)}
          /> of {numPages}
        </p>
        <button onClick={nextPage} disabled={pageNumber >= (numPages ?? -1)}>
          {">>>"}
        </button>
      </div>
        <div className="pdf-container">
          <Document
            file={src}
            onLoadSuccess={onDocumentLoadSuccess}
            className="my-react-pdf"
          >
            <Page scale={scale} pageNumber={pageNumber} />
          </Document>
        </div>
        <div className="slidecontainer">
          <button onClick={() => handleChangeScale(scale-0.1)}>- Scale</button>
          <button onClick={() => handleChangeScale(scale+0.1)}>+ Scale</button>
          <button onClick={() => handleChangeScale(0.6)}>Reset Scale</button>
        </div>

      <div style={{ display: "flex", height: "100%", alignItems: "center", justifyContent: "center", gap: "8px" }}>
        <button onClick={prevPage} disabled={pageNumber <= 1}>
          {"<<<"}
        </button>
        <p style={{margin: 0,backgroundColor: "white"}}>
          Page 
          <input
            name="pageNumberBottom"
            type="number"
            min="1"
            max={numPages}
            value={pageNumber}
            onChange={(e) => handleChangeVal(e)}
          /> of {numPages}
        </p>
        <button onClick={nextPage} disabled={pageNumber >= (numPages ?? -1)}>
          {">>>"}
        </button>
      </div>
      <div className="slidecontainer">
        <input type="range" name="sliderPage" min="1" step="1" title={pageNumber.toString()} max={numPages} value={pageNumber} onChange={handleChangeSlider} className="slider" id="myRange" />  
      </div>
    </div>
  );
}
