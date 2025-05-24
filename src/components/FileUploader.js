import React, { useRef } from 'react';

export default function FileUploader({ onFileChange }) {
  const inputRef = useRef(null);

  const handleClick = () => {
    if (inputRef.current) inputRef.current.click();
  };

  return (
    <div>
      <input
        type="file"
        accept=".pdf,.epub"
        hidden
        ref={inputRef}
        onChange={(e) => onFileChange(e)}
      />
      <button onClick={handleClick}>
        Upload PDF or EPUB
      </button>
    </div>
  );
}
