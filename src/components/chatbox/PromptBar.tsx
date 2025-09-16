import React, { useState } from "react";
import SubmitButton from "./SubmitButton";

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
     <SubmitButton onClick={handleSubmit}/>
    </div>
  );
};

export default PromptBar;