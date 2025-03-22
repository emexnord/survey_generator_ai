"use client";

import { useState } from "react";
import { IoSend } from "react-icons/io5";

const FloatingInput = () => {
  const [title, setTitle] = useState("");

  const onSubmit = () => {
    if (title.trim()) {
      window.location.href = `/survey?title=${encodeURIComponent(title)}`;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Prevent default Enter behavior (form submission or newline)
      onSubmit();
    }
  };

  return (
    <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-[550px] px-5 py-10">
      <div className="relative">
        <input
          type="text"
          value={title}
          onKeyDown={handleKeyDown}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter a title to generate survey..."
          className="w-full px-4 py-3 border border-gray-300 rounded-full shadow-sm focus:ring-2 focus:ring-gray-500 focus:outline-none peer text-gray-900 dark:text-white dark:border-gray-600 "
        />
        <button
          onClick={onSubmit}
          className="absolute right-2 top-1/2 -translate-y-1/2  w-10 h-10 rounded-full transition flex items-center justify-center"
        >
          <IoSend
            className="text-neutral-700 dark:text-neutral-300"
            size={20}
          />
        </button>
      </div>
    </div>
  );
};

export default FloatingInput;
