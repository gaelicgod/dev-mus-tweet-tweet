import React, { useState } from "react";
import { isValidTweetData, isValidUserData, processFileData } from "../libs/reader";

interface UploadFileFormProps {
  updateDisplay: any;
}

const UploadFileForm: React.FC<UploadFileFormProps> = (props: UploadFileFormProps) => {
  const { updateDisplay } = props;
  const [userData, setUserData] = useState<string>("");
  const [tweetData, setTweetData] = useState<string>("");
  const [fileError, setFileError] = useState<boolean>(false);
  const [fileErrorMessage, setFileErrorMessage] = useState<string>("");
  const asciiEncoding = "ascii";

  const onUserFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const userFiles = event.target.files;
    const error_msg = "Uploaded user file is not valid, should be a text file!";
    setFileError(false);
    if (userFiles && userFiles[0] && userFiles[0].type === "text/plain") {
      const reader = new FileReader();
      reader.onload = () => {
          const userFileData = reader.result;
          if ((typeof userFileData === "string") && isValidUserData(userFileData)) {
            setUserData(userFileData);
          } else {
            console.error(error_msg);
            setFileError(true);
          }
      }
      reader.readAsText(userFiles[0], asciiEncoding);
    } else {
      console.error(error_msg);
      setFileError(true);
    }
  }
  
  const onTweetFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const tweetFiles = event.target.files;
    const error_msg = "Uploaded tweet file is not valid, should be a text file!";
    setFileError(false);
    if (tweetFiles && tweetFiles[0] && tweetFiles[0].type === "text/plain") {
      const reader = new FileReader();
      reader.onload = () => {
          const tweetFileData = reader.result;
          if ((typeof tweetFileData === "string") && isValidTweetData(tweetFileData)) {
            setTweetData(tweetFileData);
          } else {
            console.error(error_msg);
            setFileError(true);
          }
      }
      reader.readAsText(tweetFiles[0], asciiEncoding);
    } else {
      console.error(error_msg);
      setFileError(true);
    }
  }
  
  const handleUpload = (event: React.MouseEvent<HTMLButtonElement>) => {
    // check the data that was uploaded and process it if valid
    event.preventDefault();
    setFileErrorMessage("");

    if (!fileError && userData !== "" && tweetData !== "") {
      processFileData(userData, tweetData, updateDisplay);
    } else {
      const msg = "Error sending file data!";
      console.error(msg);
      setFileErrorMessage(msg);
    }
  }

  const showError = () => {
    if (fileErrorMessage !== "") {
      return <p aria-label="error-message" className="App-error">{fileErrorMessage}</p>
    }
  }
  
  return (
    <form id="uploadForm">
      {showError()}
      <label aria-label="Users file to upload" htmlFor="users">Users file upload: </label> 
      <input type="file" name="users" id="users" onChange={onUserFileUpload} />
      <br /><br />
      <label aria-label="Tweets file to upload" htmlFor="tweets">Tweets file upload: </label>
      <input type="file" name="tweets" id="tweets" onChange={onTweetFileUpload} />
      <br /><br />
      <button id="btnSubmit" onClick={handleUpload}>Process Files</button>
    </form>
  )
}

export default UploadFileForm;