import "./styles.css";
import PdfTagIFrame from "./components/PdfTagIFrame";
import PdfTagEmbed from "./components/PdfTagEmbed";
import PdfTagObject from "./components/PdfTagObject";
import PdfJs from "./components/PdfJs";

const pdfUrl = "/compressed.tracemonkey-pldi-09.pdf";
// "https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf";

export default function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Utilize iFrame tag to embed PDF on your React!</h2>
      <div className="pdf-container">
        <PdfTagIFrame src={pdfUrl} />
      </div>
      <h2>Utilize Embed tag to embed PDF on your React!</h2>
      <div className="pdf-container">
        <PdfTagEmbed src={pdfUrl} />
      </div>
      <h2>Utilize Object tag to embed PDF on your React!</h2>
      <div className="pdf-container">
        <PdfTagObject src={pdfUrl} />
      </div>
      <div className="pdf-container">
        <PdfJs src={pdfUrl} />
      </div>
    </div>
  );
}
