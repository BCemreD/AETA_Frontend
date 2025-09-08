import React from "react";

export interface PrepPromptProps {
  onTagSelect?: (tagId: number | null) => void;
}

const PrepPrompt: React.FC<PrepPromptProps> = ({ onTagSelect }) => {
  const tags = [
    { id: 1, name: "React" },
    { id: 2, name: "Java" },
    { id: 3, name: "AI" },
  ];

  return (
    <div className="flex gap-2 mb-2">
      {tags.map(tag => (
        <button
          key={tag.id}
          className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 text-sm"
          onClick={() => onTagSelect?.(tag.id)}
        >
          {tag.name}
        </button>
      ))}
    </div>
  );
};

export default PrepPrompt;
