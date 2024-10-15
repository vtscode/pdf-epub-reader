import { PdfProps } from "../types";
import * as PDFJS from "pdfjs-dist";
import type {
  PDFDocumentProxy,
  RenderParameters,
} from "pdfjs-dist/types/src/display/api";
import pdfWorker from "pdfjs-dist/build/pdf.worker";
import { useCallback, useRef, useState, useEffect } from "react";

PDFJS.GlobalWorkerOptions.workerSrc = pdfWorker;

export default function PdfJs(props: PdfProps) {
  const { src } = props;
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [pdfDoc, setPdfDoc] = useState<PDFDocumentProxy>();
  const [currentPage, setCurrentPage] = useState(1);

  const renderPage = useCallback(
    (pageNum: number, pdf = pdfDoc) => {
      const canvas = canvasRef.current;
      if (!canvas || !pdf) return;
      pdf.getPage(pageNum).then((page) => {
        const viewport = page.getViewport({ scale: 1.5 });
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        const renderContext: RenderParameters = {
          canvasContext: canvas.getContext("2d")!,
          viewport: viewport,
        };
        page.render(renderContext);
      });
    },
    [pdfDoc, canvasRef.current]
  );

  useEffect(() => {
    renderPage(currentPage, pdfDoc);
  }, [pdfDoc, currentPage, renderPage]);

  useEffect(() => {
    const loadingTask = PDFJS.getDocument(src);
    loadingTask.promise.then(
      (loadedDoc) => {
        setPdfDoc(loadedDoc);
      },
      (error) => {
        console.error(error);
      }
    );
  }, [src]);

  const nextPage = () =>
    pdfDoc && currentPage < pdfDoc.numPages && setCurrentPage(currentPage + 1);

  const prevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);

  return <canvas ref={canvasRef}></canvas>;
}
