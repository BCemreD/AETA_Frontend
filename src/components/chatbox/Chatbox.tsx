import React from "react";
import { useSearchStore } from "../../stores/useSearchStore"
import PromptBar from "./PromptBar";
import PrepPrompt from "./PrepPrompt";

const ChatBox: React.FC = () => {
  const { chat, search } = useSearchStore();


  const handleSearch = (
    query: string,
    tagIds?: number[],
    categoryIds?: number[],
    displayName?: string
  ) => {
    search(query, tagIds, categoryIds, displayName);
  };

  return (
    <div className="flex flex-col h-[600px] p-4 border rounded">

      {/* Chat*/}
      <div className="flex-1 overflow-y-auto mb-4">
        {chat.map((msg, idx) => (
          <div key={idx} className={`mb-2 ${msg.from === "user" ? "text-right" : "text-left"}`}>
            <span className={msg.from === "user" ? "bg-blue-200 px-2 py-1 rounded" : "bg-gray-200 px-2 py-1 rounded"}>
              {msg.text}
            </span>
          </div>
        ))}
      </div>

      {/* Prepared Prompts */}
      <div className="mb-2">
        <PrepPrompt
          onSelect={({ tagIds, categoryIds }, displayName) =>
            handleSearch("", tagIds, categoryIds, displayName)
          }
        />
      </div>

      {/*Input Bar*/}
      <PromptBar onSubmit={(query) => handleSearch(query)} />
    </div>
  );
};

export default ChatBox;
