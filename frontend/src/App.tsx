import React, { useEffect, useState } from "react";
import logo from "./logo.webp";
import "./App.css";
import upload from "./services/FileUploadService";
import { UploadFile } from "./components/FileUpload";
import { Grid } from "./components/Grid";

function App() {
  const [file, setFile] = useState<any>(null);
  const [gridData, setGridData] = useState<any[]>([]);
  const [message, setMessage] = useState<string>();

  const onFileSelected = async (file?: File) => {
    if (!file) return;
    setFile(file);
  };

  const onClearFileSelection = () => {
    setGridData([]);
    setMessage("");
  };

  useEffect(() => {
    if (file) {
      upload(file).then((response: any) => {
        if (response.data) {
          setGridData(response.data);
          setMessage("");
        } else if (response.message) {
          setMessage(response.message);
          setGridData([]);
        }
      });
    }
  }, [file]);

  return (
    <div className="App">
      <img src={logo} alt="Logo" />
      <p className="message">Upload your .txt file to start...</p>
      <UploadFile
        onFileSelected={onFileSelected}
        onClearFileSelection={onClearFileSelection}
      />
      <div className="messageContainer">
        <p className="error-message">{message}</p>
      </div>
      {gridData.length > 0 ? <Grid gridData={gridData} /> : null}
    </div>
  );
}
export default App;
