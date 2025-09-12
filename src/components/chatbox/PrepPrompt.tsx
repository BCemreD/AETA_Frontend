import React, { useState } from "react";

const PREPROMPT_DATA = {
  Backend: {
    tags: [{ name: "Java", id: 1 }, { name: "Spring Boot", id: 2 }],
    categories: [{ name: "Yazılım Geliştirme", id: 1 }, { name: "Backend", id: 6 }],
  },
  Frontend: {
    tags: [{ name: "React", id: 7 }, { name: "JavaScript", id: 4 }],
    categories: [{ name: "Frontend", id: 7 }, { name: "Web Programlama", id: 8 }],
  },
  Fullstack: {
    tags: [],
    categories: [{ name: "Web Programlama", id: 8 }, { name: "Yazılım Geliştirme", id: 1 }],
  },
  Veri: {
    tags: [{ name: "Veri Bilimi", id: 6 }],
    categories: [{ name: "Veri", id: 3 }],
  },
};

type MainCategory = keyof typeof PREPROMPT_DATA;

export interface PrepPromptProps {
  onSelect: (
    selection: { tagIds?: number[]; categoryIds?: number[] },
    displayName?: string
  ) => void;
}

const PrepPrompt: React.FC<PrepPromptProps> = ({ onSelect }) => {
  const [selectedCategory, setSelectedCategory] = useState<MainCategory | null>(null);
  const mainCategories: MainCategory[] = ["Backend", "Frontend", "Fullstack", "Veri"];

  const handleMainCategoryClick = (category: MainCategory) => {
    setSelectedCategory(selectedCategory === category ? null : category);
  };

  const handleSubItemClick = (
    type: "tag" | "category",
    id: number,
    name: string
  ) => {
    if (type === "tag") {
      onSelect({ tagIds: [id] }, name);
    } else {
      onSelect({ categoryIds: [id] }, name);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap gap-2 mb-2">
        {mainCategories.map((category) => (
          <button
            key={category}
            className={`px-3 py-1 rounded-full text-sm font-medium ${selectedCategory === category ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
            onClick={() => handleMainCategoryClick(category)}
          >
            {category}
          </button>
        ))}
      </div>
      {selectedCategory && (
        <div className="flex flex-wrap gap-2 mt-2 pt-2 border-t border-gray-200">
          {PREPROMPT_DATA[selectedCategory].tags.map((tag) => (
            <button key={tag.id} className="px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-600 hover:bg-gray-200" onClick={() => handleSubItemClick("tag", tag.id, tag.name)}>
              #{tag.name}
            </button>
          ))}
          {PREPROMPT_DATA[selectedCategory].categories.map((category) => (
            <button key={category.id} className="px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-600 hover:bg-gray-200" onClick={() => handleSubItemClick("category", category.id, category.name)}>
              #{category.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default PrepPrompt;