import React, { useState, useEffect, useRef } from 'react';
import './Run.css';

function Run({ shortcut = { key: 'h', altKey: true } }) {
  const [showInput, setShowInput] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.altKey === shortcut.altKey && event.key === shortcut.key) {
        setShowInput((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [shortcut]);

  useEffect(() => {
    if (showInput && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showInput]);

  return (
    <>
      {showInput && (
        <div className="run-container">
          <input
            ref={inputRef}
            type="text"
            className="run-input"
            placeholder="Search..."
          />
        </div>
      )}
    </>
  );
}

export default Run;
