import React from "react";

interface PrepPromptProps {
  mainCategories: string[];
  subCategories: Record<string, string[]>;
  selectedMain: string | null;
  selectedSub: string | null;
  onSelectMain: (cat: string) => void;
  onSelectSub: (sub: string) => void;
}

const PrepPrompt: React.FC<PrepPromptProps> = ({
  mainCategories,
  subCategories,
  selectedMain,
  selectedSub,
  onSelectMain,
  onSelectSub
}) => {
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-wrap gap-2">
        {mainCategories.map(cat => (
          <button
            key={cat}
            onClick={() => { onSelectMain(cat); onSelectSub(""); }}
            className={`px-4 py-2 rounded-full border ${
              selectedMain === cat ? "bg-blue-500 text-white" : "bg-gray-100"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {selectedMain && (
        <div className="flex flex-wrap gap-2 mt-2">
          {subCategories[selectedMain].map(sub => (
            <button
              key={sub}
              onClick={() => onSelectSub(sub)}
              className={`px-3 py-1 rounded-full border ${
                selectedSub === sub ? "bg-green-500 text-white" : "bg-gray-200"
              }`}
            >
              {sub}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default PrepPrompt;
