import React, { useState } from "react";

interface PromptBarProps {
  onSubmit: (query: string) => void;
}

const PromptBar: React.FC<PromptBarProps> = ({ onSubmit }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = () => {
    if (!query.trim()) return;
    onSubmit(query);
    setQuery("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className="flex gap-2">
      <input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Ne aradığınızı yazın..."
        className="flex-1 p-2 border rounded"
        onKeyDown={handleKeyDown}
      />
      <button onClick={handleSubmit} className="bg-blue-600 text-white px-4 py-2 rounded">
        Ara
      </button>
    </div>
  );
};

export default PromptBar;