import React, { useState } from "react";

interface Props {
  onSubmit: (query: string) => void;
}

const PromptBar: React.FC<Props> = ({ onSubmit }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = () => {
    if (!query.trim()) return;
    onSubmit(query);
    setQuery("");
  };

  return (
    <div className="flex gap-2 mb-4">
      <input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Bir soru yazın..."
        className="flex-1 p-2 border rounded"
        onKeyDown={e => e.key === "Enter" && handleSubmit()}
      />
      <button onClick={handleSubmit} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Gönder
      </button>
    </div>
  );
};

export default PromptBar;
