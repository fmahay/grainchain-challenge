import { useEffect, useRef, useState } from "react";

export interface UploadFileProps {
  onFileSelected: (file?: File) => void;
  onClearFileSelection: () => void;
}

export const UploadFile = (props: UploadFileProps) => {
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const inputRef = useRef<any>(null);

  const handleOnChange = (e: React.FormEvent<HTMLInputElement>) => {
    const files: any = (e.target as HTMLInputElement).files || [];
    if (files) {
      setSelectedFile(files[0]);
    }
  };

  const resetFileInput = () => {
    if (!inputRef) {
      return;
    }
    inputRef.current.value = null;
    setSelectedFile(null);

    if (!props.onClearFileSelection) return;
    props.onClearFileSelection();
  };

  const handleClick = (e: any) => {
    inputRef.current.click();
  };

  useEffect(() => {
    if (!props.onFileSelected) return;
    props.onFileSelected(selectedFile);
  }, [selectedFile, props]);

  return (
    <>
      <button className="file-button" onClick={handleClick}>
        Upload a file
      </button>
      <input
        ref={inputRef}
        style={{ display: "none" }}
        type="file"
        accept=".txt"
        onChange={handleOnChange}
        onAbort={resetFileInput}
      />
      {selectedFile ? (
        <button className="clear-button" onClick={resetFileInput}>
          Clear
        </button>
      ) : null}
    </>
  );
};
