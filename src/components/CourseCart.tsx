import React from "react";
import { FavoriteButton } from "./FavoriteButton";

interface Course {
  id: number;
  title: string;
  imageSrc: string;
  imageAlt: string;
  url: string;
  createdAt?: string;
  tags?: string[];
  isFavorite?: boolean;
}

interface CourseCartProps {
  course: Course;
  
}

const CourseCart = ({ course }: CourseCartProps) => {
  return (
    <div
      className="rounded-2xl shadow-md p-4 mb-4 cursor-pointer hover:shadow-lg transition"
      onClick={() => window.open(course.url, "_blank")}
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-2">
        <h2 className="text-lg font-semibold text-gray-800">{course.title}</h2>
        
        <FavoriteButton courseId={course.id} />
      </div>

      {/* Image */}
      {course.imageSrc && (
        <img
          src={course.imageSrc}
          alt={course.imageAlt || "course image"}
          className="w-full h-48 object-cover rounded-lg mb-3"
        />
      )}

      {/* Footer */}
      <div className="text-sm text-gray-500 mb-2">
        {course.createdAt && (
          <span>{new Date(course.createdAt).toLocaleDateString()}</span>
        )}
      </div>

      {/* Tags */}
      {course.tags && course.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {course.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default CourseCart;