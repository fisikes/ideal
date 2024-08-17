import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Run.css';

function Run({ routes }) {
  const [showInput, setShowInput] = useState(false);
  const [query, setQuery] = useState('');
  const [filteredRoutes, setFilteredRoutes] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isPinned, setIsPinned] = useState(false);
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [showCoordinates, setShowCoordinates] = useState(false);
  const draggingRef = useRef(false);
  const inputRef = useRef(null);
  const containerRef = useRef(null);
  const startPos = useRef({ x: 0, y: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.altKey && event.key === 'h' && !isPinned) {
        setShowInput((prev) => !prev);
      } else if (event.key === 'Escape' && !isPinned) {
        setShowInput(false);
      }

      if (showInput) {
        if (event.key === 'ArrowDown') {
          setSelectedIndex((prevIndex) => (prevIndex + 1) % filteredRoutes.length);
        } else if (event.key === 'ArrowUp') {
          setSelectedIndex((prevIndex) => (prevIndex - 1 + filteredRoutes.length) % filteredRoutes.length);
        } else if (event.key === 'Enter') {
          navigate(filteredRoutes[selectedIndex]?.path);
          if (!isPinned) {
            setShowInput(false);
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [filteredRoutes, selectedIndex, showInput, isPinned, navigate]);

  useEffect(() => {
    if (showInput && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showInput]);

  useEffect(() => {
    setFilteredRoutes(
      routes.filter((route) => route.name.toLowerCase().includes(query.toLowerCase()))
    );
    setSelectedIndex(0);
  }, [query, routes]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target) && !isPinned) {
        setShowInput(false);
      }
    };

    if (showInput) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showInput, isPinned]);

  const togglePin = () => {
    setIsPinned((prev) => !prev);
  };

  const handleMouseDown = (e) => {
    draggingRef.current = true;
    setShowCoordinates(true);
    startPos.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
  };

  const handleMouseMove = (e) => {
    if (draggingRef.current) {
      const newPosition = {
        x: e.clientX - startPos.current.x,
        y: e.clientY - startPos.current.y,
      };
      setPosition(newPosition);
    }
  };

  const handleMouseUp = () => {
    draggingRef.current = false;
    setShowCoordinates(false);
  };

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  const handleMouseEnter = (index) => {
    setSelectedIndex(index);
  };

  const handleMouseClick = (index) => {
    navigate(filteredRoutes[index]?.path);
    if (!isPinned) {
      setShowInput(false);
    }
  };

  return (
    <>
      {showInput && (
        <div
          className="run-container"
          ref={containerRef}
          style={{ top: `${position.y}px`, left: `${position.x}px`, position: 'absolute' }}
          onMouseDown={handleMouseDown}
        >
          <div className="pin-button-container">
            <button className="pin-button" onClick={togglePin}>
              {isPinned ? '📌' : '📍'}
            </button>
          </div>
          <div className="run-header">
            <input
              ref={inputRef}
              type="text"
              className="run-input"
              placeholder="Search..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <ul className="suggestions">
            {filteredRoutes.map((route, index) => (
              <li
                key={route.path}
                className={index === selectedIndex ? 'selected' : ''}
                onMouseEnter={() => handleMouseEnter(index)}
                onClick={() => handleMouseClick(index)}
              >
                {route.name}
              </li>
            ))}
          </ul>
          {showCoordinates && (
            <div className="coordinates">
              X: {position.x}, Y: {position.y}
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default Run;
