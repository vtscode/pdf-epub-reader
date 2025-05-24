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

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  function nextPage() {
    setPageNumber((v) => ++v);
  }

  function prevPage() {
    setPageNumber((v) => --v);
  }

  return (
    <div style={{ display: "grid", height: "100%", alignItems: "center", justifyContent: "center", gap: "8px", margin: "10px 0px" }}>
      <div style={{ display: "flex", height: "100%", alignItems: "center", justifyContent: "center", gap: "8px", margin: "10px 0px" }}>
        <button onClick={prevPage} disabled={pageNumber <= 1}>
          {"<<<"}
        </button>
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
          <Page pageNumber={pageNumber} />
        </Document>
        <p>
          Page {pageNumber} of {numPages}
        </p>
      </div>

      <div style={{ display: "flex", height: "100%", alignItems: "center", justifyContent: "center", gap: "8px", margin: "10px 0px" }}>
        <button onClick={prevPage} disabled={pageNumber <= 1}>
          {"<<<"}
        </button>
        <button onClick={nextPage} disabled={pageNumber >= (numPages ?? -1)}>
          {">>>"}
        </button>
      </div>
    </div>
  );
}
