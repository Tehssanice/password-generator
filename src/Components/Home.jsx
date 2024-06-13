import React, { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { IoCopyOutline } from "react-icons/io5";

export default function Home() {
  const [textToCopy, setTextToCopy] = useState("");
  const [copyStatus, setCopyStatus] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [length, setLength] = useState("");
  const [lengthErrorMessage, setLengthErrorMessage] = useState(""); // To hold length error message
  const [randomString, setRandomString] = useState("");
  const [useUppercase, setUseUppercase] = useState(true);
  const [useLowercase, setUseLowercase] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);

  const generateRandomString = (length) => {
    const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
    const numberChars = "0123456789";
    const symbolChars = "!@#$%^&*()*+,-./:;<=>?@";

    let allChars = "";
    if (useUppercase) allChars += uppercaseChars;
    if (useLowercase) allChars += lowercaseChars;
    if (useNumbers) allChars += numberChars;
    if (useSymbols) allChars += symbolChars;

    if (allChars === "") allChars = lowercaseChars;

    let result = "";
    while (result.length < length) {
      const randomInd = Math.floor(Math.random() * allChars.length);
      result += allChars.charAt(randomInd);
    }

    return result;
  };

  const validatePassword = (password) => {
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumbers = /[0-9]/.test(password);
    const hasSymbols = /[!@#$%^&*()*+,-./:;<=>?@]/.test(password);

    if (useUppercase && !hasUppercase) return false;
    if (useLowercase && !hasLowercase) return false;
    if (useNumbers && !hasNumbers) return false;
    if (useSymbols && !hasSymbols) return false;

    setUseUppercase(hasUppercase);
    setUseLowercase(hasLowercase);
    setUseNumbers(hasNumbers);
    setUseSymbols(hasSymbols);

    return true;
  };

  const handleGenerate = () => {
    const validatedLength = Math.max(8, Math.min(length, 20)); // Ensure length is between 8 and 20
    let newString = generateRandomString(validatedLength);
    while (!validatePassword(newString)) {
      newString = generateRandomString(validatedLength);
    }
    setRandomString(newString);
    setTextToCopy(newString);
  };

  const handleLengthChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (value >= 8 && value <= 20) {
      setLength(value);
    }
  };

  const handleUppercaseChange = (e) => {
    setUseUppercase(e.target.checked);
  };

  const handleLowercaseChange = (e) => {
    setUseLowercase(e.target.checked);
  };

  const handleNumbersChange = (e) => {
    setUseNumbers(e.target.checked);
  };

  const handleSymbolsChange = (e) => {
    setUseSymbols(e.target.checked);
  };

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

        {lengthErrorMessage && (
          <div className="alert">
            <p>{lengthErrorMessage}</p>
          </div>
        )}

        <div className="Password-holder">
          <button onClick={handleGenerate}>Generate Password</button>

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
            <input type="number" min="8" max="20" value={length} onChange={handleLengthChange} />
          </div>
          <div>
            <p>Uppercase(A-Z)</p>
            <input type="checkbox" checked={useUppercase} onChange={handleUppercaseChange} />
          </div>
          <div>
            <p>Lowercase(a-z)</p>
            <input type="checkbox" checked={useLowercase} onChange={handleLowercaseChange} />
          </div>
          <div>
            <p>Numbers(0-9)</p>
            <input type="checkbox" checked={useNumbers} onChange={handleNumbersChange} />
          </div>
          <div>
            <p>Symbols(&-#)</p>
            <input type="checkbox" checked={useSymbols} onChange={handleSymbolsChange} />
          </div>
        </div>
      </div>
    </div>
  );
}
