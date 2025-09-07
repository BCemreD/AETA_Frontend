import React, { useState, useEffect } from "react";
import PrePrompt from "./PrePrompt";

interface ChatboxProps {
  onSubCategorySelect: React.Dispatch<React.SetStateAction<string | null>>;
}

const mainCategories = ["Backend", "Frontend", "Data", "Web Geliştirme"];
const subCategories = {
  Backend: ["Java", "Python", "Node.js", "Web Geliştirme"],
  Frontend: ["React", "Vue", "Angular"],
  Data: ["Data Science", "Machine Learning", "ETL"],
  "Web Geliştirme": ["HTML/CSS", "JS", "Frameworks"]
};

const tagIds: Record<string, number> = {
  Java: 1,
  "Spring Boot": 2,
  Frontend: 3,
  Cloud: 4,
  "Data Science": 5,
  Python: 6,
  Nodejs: 7,
  "Web Geliştirme": 8,
  React: 9,
  Vue: 10,
  Angular: 11,
  "Machine Learning": 12,
  ETL: 13,
  "HTML/CSS": 14,
  JS: 15,
  Frameworks: 16
};

const Chatbox: React.FC<ChatboxProps> = ({ onSubCategorySelect }) => {
  const [selectedMain, setSelectedMain] = useState<string | null>(null);
  const [selectedSub, setSelectedSub] = useState<string | null>(null);

  // Seçilen alt kategoriyi HomePage'e bildir
  useEffect(() => {
    onSubCategorySelect(selectedSub);
  }, [selectedSub, onSubCategorySelect]);

  return (
    <div className="flex p-4 space-x-4">
      <div className="w-1/4">
        <PrePrompt
          mainCategories={mainCategories}
          subCategories={subCategories}
          selectedMain={selectedMain}
          selectedSub={selectedSub}
          onSelectMain={setSelectedMain}
          onSelectSub={setSelectedSub}
        />
      </div>
      <div className="flex-1 overflow-y-auto">
        <p>Bir kategori seçiniz...</p>
      </div>
    </div>
  );
};

export default Chatbox;
