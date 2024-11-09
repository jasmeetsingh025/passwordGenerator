import { useCallback, useEffect, useRef, useState } from "react";
function App() {
  const [length, setLength] = useState(8);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [Password, setPassword] = useState("");
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numAllowed) {
      str += "0123456789";
    }
    if (charAllowed) {
      str += "!@#$%^&*()_+=-";
    }
    for (let i = 0; i < length; i++) {
      pass += str.charAt(Math.floor(Math.random() * str.length + 1));
    }
    setPassword(pass);
  }, [length, numAllowed, charAllowed, setPassword]);

  const copyPasswordGenerator = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(Password);
  }, [Password]);

  useEffect(() => {
    passwordGenerator();
  }, [passwordGenerator, numAllowed, charAllowed, length]);

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-1 my-7 text-orange-400 bg-gray-700 text-center">
          <h1 className="text-white text-center my-2">Password Generator</h1>
          <div className="flex shadow rounded-lg overflow-hidden mb-4">
            <input
              type="text"
              value={Password}
              className="outline-none w-full py-1 px-3"
              placeholder="Password"
              readOnly
              ref={passwordRef}
            />
            <button
              className="outline-none bg-blue-700 px-3 py-0.5 shrink-0 text-white"
              onClick={copyPasswordGenerator}
            >
              Copy
            </button>
          </div>
          <div className="flex text-sm gap-x-2">
            <div className="flex items-center gap-x-1">
              <input
                className="cursor-pointer"
                type="range"
                min={6}
                max={100}
                value={length}
                onChange={(e) => {
                  setLength(e.target.value);
                }}
              />
              <label>Length: {length}</label>
            </div>
            <div className="flex items-center gap-x-1">
              <input
                type="checkbox"
                defaultChecked={numAllowed}
                id="numberInput"
                onChange={() => {
                  setNumAllowed((prev) => !prev);
                }}
              />
              <label htmlFor="numberInput">Numbers</label>
            </div>
            <div className="flex items-center gap-x-1">
              <input
                type="checkbox"
                defaultChecked={charAllowed}
                id="characterInput"
                onChange={() => {
                  setCharAllowed((prev) => !prev);
                }}
              />
              <label htmlFor="characterInput">Character</label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
