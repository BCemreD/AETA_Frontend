/* // src/components/FavoritesPage.tsx

import React, { useEffect } from "react";
import { Star } from "lucide-react";
import { useFavoriteStore } from "../stores/useFavoriteStore";
import { useAuthStore } from "../stores/useAuthStore";
import { useNavigate } from "react-router-dom";
import  CourseCart  from "../components/CourseCart"; 
import EmptyState from "../components/favorite/EmptyState"; 
import Spinner from "../components/favorite/Spinner"; 
const FavoritesPage: React.FC = () => {
  const { user } = useAuthStore();
  const { favorites, loading, error, fetchFavorites } = useFavoriteStore();
  const navigate = useNavigate();

  useEffect(() => {
    
    if (user) {
      fetchFavorites(user.id);
    }
  }, [user, fetchFavorites]);

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Your Favorites</h2>
        <p className="text-gray-600 mb-6">Please log in to see your favorites.</p>
        <button
          onClick={() => navigate("/login")}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Log In
        </button>
      </div>
    );
  }

  if (loading) {
    // Yükleme durumunda bir spinner gösterebilirsin
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500">
        Error loading favorites: {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold text-center mb-8">My Favorite Courses</h1>
      
      {favorites.length === 0 ? (
        <EmptyState 
          title="No Favorites Yet"
          description="Looks like you haven't added any courses to your favorites. Start exploring to find courses you love!"
          buttonText="Explore Courses"
          buttonLink="/courses"
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {favorites.map((fav) => (
            <CourseCart key={fav.id} course={fav.course} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage; */