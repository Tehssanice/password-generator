import React, { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { IoCopyOutline } from "react-icons/io5";

export default function Home() {
  const [textToCopy, setTextToCopy] = useState(""); // The text you want to copy
  const [copyStatus, setCopyStatus] = useState(false); // To indicate if the text was copied
  const [errorMessage, setErrorMessage] = useState(""); // To hold error message if there is  no text to copy

  const onCopyText = () => {
    if (textToCopy.trim() === "") {
      setErrorMessage("No text to copy!");
      setTimeout(() => setErrorMessage(""), 2000); // Clear error message after 2 seconds
    } else {
      setErrorMessage(""); // Clear any existing error message
      setCopyStatus(true);
      setTimeout(() => setCopyStatus(false), 2000); // Reset status after 2 seconds
    }
  };

  return (
    <div className="header-container">
      <h2>Password Generator</h2>

      <div className="Password-body">
        <div className="alert">{copyStatus && <p>Text copied to clipboard!</p>}</div>
        {errorMessage && (
          <div className="alert">
            <p>{errorMessage}</p>
          </div>
        )}

        <div className="Password-holder">
          <div className="Password-input">
            <input type="text" value={textToCopy} onChange={(e) => setTextToCopy(e.target.value)} />
          </div>
          <div className="copy-icon">
            <CopyToClipboard text={textToCopy} onCopy={onCopyText}>
              <IoCopyOutline />
            </CopyToClipboard>
          </div>
        </div>

        <p>Customize Your Password</p>

        <div className="Password-options">
          <div>
            <p>Password Length</p>
            <input type="number" min="8" max="20" />
          </div>
          <div>
            <p>Uppercase(A-Z)</p>
            <input type="checkbox" />
          </div>
          <div>
            <p>Lowercase(a-z)</p>
            <input type="checkbox" />
          </div>

          <div>
            <p>Numbers(0-9)</p>
            <input type="checkbox" />
          </div>
          <div>
            <p>Symbols(&-#)</p>
            <input type="checkbox" />
          </div>
        </div>

        <button>Generate Password</button>
      </div>
    </div>
  );
}
