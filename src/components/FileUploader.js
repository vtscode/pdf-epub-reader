import React, { useRef } from 'react';

export default function FileUploader({ onFileChange, epubIframe, setIsEpubIframe }) {
  const inputRef = useRef(null);

  const handleClick = () => {
    if (inputRef.current) inputRef.current.click();
  };

  return (
    <div>
      {!epubIframe && <>
      <input
        type="file"
        accept=".pdf,.epub"
        hidden
        ref={inputRef}
        onChange={(e) => onFileChange(e)}
      />
      <button onClick={handleClick}>
        Open PDF File
      </button>
      </>}
      <button onClick={() => setIsEpubIframe(!epubIframe)}>
        {epubIframe ? "Switch PDF" : "Toogle EPUB"}
      </button>
    </div>
  );
}
