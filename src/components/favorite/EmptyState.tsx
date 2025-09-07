import React from "react";
import { StarOff } from "lucide-react";
import { Link } from "react-router-dom";

interface EmptyStateProps {
  title?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title = "No items yet",
  description = "Looks like there's nothing here. Start exploring to find courses you love!",
  buttonText = "Explore Courses",
  buttonLink = "/courses",
}) => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 bg-white rounded-lg shadow-sm max-w-lg mx-auto">
      <div className="mb-4">
        <StarOff size={64} className="text-gray-400" />
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600 mb-6">{description}</p>
      {buttonLink && (
        <Link
          to={buttonLink}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition-colors"
        >
          {buttonText}
        </Link>
      )}
    </div>
  );
};

export default EmptyState;