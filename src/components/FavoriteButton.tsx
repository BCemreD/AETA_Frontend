import { Star } from "lucide-react";
import { useFavoriteStore } from "../stores/useFavoriteStore";
import { useAuthStore } from "../stores/useAuthStore"; 

interface FavoriteButtonProps {
  courseId: number;
}

export const FavoriteButton: React.FC<FavoriteButtonProps> = ({ courseId }) => {
  const { user } = useAuthStore();
  const { favorites, addFavorite, removeFavorite } = useFavoriteStore();

  const isFavorite = favorites.some((f) => f.course.id === courseId);

  const toggleFavorite = async () => {
    if (!user) {
      alert("Favorilere eklemek için lütfen giriş yapın.");
      return;
    }

    if (isFavorite) {
      
      await fetch(
        `http://localhost:8080/api/favorites?userId=${user.id}&courseId=${courseId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      removeFavorite(courseId);
    } else {
    
      const res = await fetch(`http://localhost:8080/api/favorites`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          user: { id: user.id },
          course: { id: courseId },
        }),
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