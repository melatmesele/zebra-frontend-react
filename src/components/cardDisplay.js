import React, { useState } from 'react';
import Card from './card';

const Popup = ({ text, onClose }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="bg-white rounded-lg p-8">
        <p>{text}</p>
        <button
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

const CardApp = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [popupText, setPopupText] = useState('');

  const handleCardClick = (text) => {
    setPopupText(text);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const cardContents = ['FOAM', 'TEXTILE', 'SOLD', 'MY-COST', 'TS-COST'];

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex">
        {cardContents.slice(0, 3).map((content, index) => (
          <Card
            key={index}
            text={content}
            onClick={() => handleCardClick(`${content} Clicked`)}
          />
        ))}
      </div>
      <div className="flex mt-8">
        {cardContents.slice(3).map((content, index) => (
          <Card
            key={index}
            text={content}
            onClick={() => handleCardClick(`${content} Clicked`)}
          />
        ))}
      </div>
      {showPopup && <Popup text={popupText} onClose={handleClosePopup} />}
    </div>
  );
};

export default CardApp;
