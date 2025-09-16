import React from "react";


interface CategoryProps {
    categories: string[];
}
const Tag: React.FC<CategoryProps> = ({ categories }) => {


    return (
        <div className="flex flex-wrap gap-2">
            {categories.map((category, index) => (
                <span
                    key={index}
                    className="text-xs bg-white text-[#253342] px-2 py-1 rounded-full"
                >
                    #{category}
                </span>
            ))}
        </div>

    );
};

export default Tag;