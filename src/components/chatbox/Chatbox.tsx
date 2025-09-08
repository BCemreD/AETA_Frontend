import React from "react";
import { useSearchStore } from "../../stores/useSearchStore";
import PrepPrompt from "./PrePrompt";
import type { PrepPromptProps } from "./PrePrompt";
import PromptBar from "./PromptBar";

interface ChatboxProps {}

const Chatbox: React.FC<ChatboxProps> = () => {
  const { chat, search } = useSearchStore();

 
  const handleTagSelect: PrepPromptProps["onTagSelect"] = (tagId) => {
    search("", tagId ?? undefined);
  };

  const handleSendMessage = (message: string) => {
    search(message);
  };

  return (
    <div className="border p-4 rounded-lg h-96 flex flex-col gap-2">
      
      {/* Tag selection */}
      <PrepPrompt onTagSelect={handleTagSelect} />

      {/* Messages */}
      <div className="flex-1 overflow-y-auto flex flex-col gap-2 mb-2">
        {chat.map((msg, idx) => (
          <div
            key={idx}
            className={`p-2 rounded ${
              msg.from === "user" ? "bg-blue-100 self-end" : "bg-gray-200 self-start"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      {/* Input */}
      <PromptBar onSubmit={handleSendMessage} />
    </div>
  );
};

export default Chatbox;
