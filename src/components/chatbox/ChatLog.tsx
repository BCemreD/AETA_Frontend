import React, { useRef, useEffect } from "react";
import { useSearchStore } from "../../stores/useSearchStore"



export const ChatLog: React.FC = () => {
    const { chat } = useSearchStore();

    //for auto scrool
    const chatEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (chatEndRef.current) {
            chatEndRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
        }
    }, [chat]);

    return (
        <div className="flex-1 overflow-y-auto mb-4">
            {chat.map((msg, idx) => (
                <div key={idx} className={`mb-2 ${msg.from === "user" ? "text-right" : "text-left"}`}>
                    <span className={msg.from === "user" ? "bg-gray-100 shadow shadow-gray-300 px-2 py-1 rounded-2xl" : "bg-[#034ea2]/20 shadow shadow-gray-300 px-2 py-1 rounded-2xl"}>
                        {msg.text}
                    </span>
                </div>
            ))}
            <div ref={chatEndRef} />
        </div>
    )
}
export default ChatLog;