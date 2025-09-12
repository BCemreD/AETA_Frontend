import React from "react";
import { Link } from "react-router-dom";
//import { FavoriteButton } from "./favorite/FavoriteButton";
import { useAuthStore } from "../stores/useAuthStore";
import type { Course } from "../stores/useCourseStore";
import ImageHolder from "./chatbox/ImageHolder";
import { getImageUrl } from "../utils/utils";

interface CourseCartProps {
  course: Course;
}

const CourseCart = ({ course }: CourseCartProps) => {
  const { user } = useAuthStore(); // user info

  return (
    <div className="rounded-2xl shadow-md p-4 mb-4 relative hover:shadow-lg transition">
      {/* Header */}
      <div className="flex justify-between items-start mb-2">
        <h2 className="text-lg font-semibold text-[#253342]">{course.title}</h2>

        {/* {user && <FavoriteButton course={course} />}⭐ */}
        
      </div>

      <Link to={course.url} target="_blank" rel="noopener noreferrer">

        {/* Image */}
        <ImageHolder
        src={getImageUrl(course.imageSrc)}
        alt={course.imageAlt || "Course image"}
      />


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
                className="text-xs bg-gray-200 text-[#253342] px-2 py-1 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </Link>
    </div>
  );
};

export default CourseCart;
