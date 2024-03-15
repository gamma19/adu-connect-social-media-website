import React, { useState } from "react";
import EmojiPicker from "emoji-picker-react"; // Replace with the actual library you're using
import "./EmojiComponent.css";

const EmojiComponent = () => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleToggleEmojiPicker = () => {
    setShowEmojiPicker((prevState) => !prevState);
  };

  return (
    <div className="emoji-container">
      <button
        onClick={handleToggleEmojiPicker}
        style={{ borderRadius: "20px" }}
      >
        &#128512;
      </button>
      {showEmojiPicker && (
        <div className="emoji-picker">
          <EmojiPicker height={500} width={400} />
        </div>
      )}
    </div>
  );
};

export default EmojiComponent;
