/* import React from "react";
import { useAuthStore } from "../../stores/useAuthStore";
//import { useFavoriteStore } from "../../stores/useFavoriteStore";
import type { Course } from "../../stores/useCourseStore";

interface FavoriteButtonProps {
  course: Course;
}

export const FavoriteButton = ({ course }: FavoriteButtonProps) => {
  const { user, token } = useAuthStore();
  //const { favorites, toggleFavorite } = useFavoriteStore();

  if (!user || !token) {
    return null; 
  }

  const isFavorite = favorites.some((fav) => fav.course.id === course.id);

  const handleClick = async () => {
    if (!user || !token) return;
    try {
      await toggleFavorite(course.id, course, user.id, token);
    } catch (err) {
      console.error("Favori işlemi başarısız:", err);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`px-3 py-1 rounded-full text-sm font-medium transition ${
        isFavorite
          ? "bg-red-500 text-white hover:bg-red-600"
          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
      }`}
    >
      {isFavorite ? "Favoriden Çıkar" : "Favorilere Ekle"}
    </button>
  );
};
 */