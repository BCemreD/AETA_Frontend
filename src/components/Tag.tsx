import React from "react";


interface TagProps {
    tags: string[];
}
const Tag: React.FC<TagProps> = ({ tags }) => {


    return (
        <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
                <span
                    key={index}
                    className="text-xs bg-white text-[#253342] px-2 py-1 rounded-full"
                >
                    #{tag}
                </span>
            ))}
        </div>

    );
};

export default Tag;