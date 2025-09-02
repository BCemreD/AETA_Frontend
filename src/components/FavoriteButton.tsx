import { Star } from "lucide-react";
import { useFavoriteStore } from "../stores/useFavoriteStore";

interface FavoriteButtonProps {
  courseId: number;
}

export const FavoriteButton: React.FC<FavoriteButtonProps> = ({ courseId }) => {
  const { favorites, addFavorite, removeFavorite } = useFavoriteStore();

  const isFavorite = favorites.some((f) => f.courseId === courseId);

  const toggleFavorite = async () => {
    if (isFavorite) {
      
      await fetch(`/api/favorites/${courseId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      removeFavorite(courseId);
    } else {
      const res = await fetch(`/api/favorites`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ courseId }),
      });
      const newFav = await res.json();
      addFavorite(newFav);
    }
  };

  return (
    <button onClick={toggleFavorite} className="ml-2">
      <Star
        size={20}
        className={isFavorite ? "fill-yellow-500 text-yellow-500" : "text-gray-400"}
      />
    </button>
  );
};