import React from "react";

interface ImageHolderProps {
  src: string;
  alt: string;
}

const ImageHolder: React.FC<ImageHolderProps> = ({ src, alt }) => {
  return (
    <div className="w-[100px] h-[100px] border border-gray-200 rounded-md overflow-hidden flex items-center justify-center bg-white">
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default ImageHolder;
