import React, { useRef, useEffect } from "react";
import { useSearchStore } from "../../stores/useSearchStore"
import PromptBar from "./PromptBar";
import PrepPrompt from "./PrepPrompt";
import ChatLog from "./ChatLog";


const ChatBox: React.FC = () => {

  const { search } = useSearchStore();

  const handleSearch = (
    query: string,
    tagIds?: number[],
    categoryIds?: number[],
    preparedPromptText?: string
  ) => {
    search(query, tagIds, categoryIds, preparedPromptText);
  };

  return (
    <div className="flex flex-col h-[600px] p-4 border rounded border-gray-100 shadow-2xl">

      {/* Chat*/}
      <ChatLog />

      {/* Prepared Prompts */}
      <div className="mb-2">
        <PrepPrompt
          onSelect={({ tagIds, categoryIds }, preparedPromptText) =>
            handleSearch("", tagIds, categoryIds, preparedPromptText)
          }
        />
      </div>

      {/*Input Bar*/}
      <PromptBar onSubmit={(query) => handleSearch(query)} />
    </div>
  );
};

export default ChatBox;
