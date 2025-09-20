/* import { create } from "zustand";
import { useAuthStore } from "./useAuthStore";
import type { Course } from "./useCourseStore";

interface FavoriteDto {
  id?: number;
  user: { id: number };
  course: Course;
}

interface FavoriteState {
  favorites: FavoriteDto[];
  loading: boolean;
  error: string | null;
  setFavorites: (favorites: FavoriteDto[]) => void;
  addFavorite: (favorite: FavoriteDto) => void;
  removeFavorite: (courseId: number) => void;
  fetchFavorites: (userId: number, token: string) => Promise<void>;
  toggleFavorite: (
    courseId: number,
    course: Course,
    userId: number,
    token: string
  ) => Promise<void>;
}

export const useFavoriteStore = create<FavoriteState>((set, get) => ({
  favorites: [],
  loading: false,
  error: null,

  setFavorites: (favorites) => set({ favorites }),
  addFavorite: (favorite) =>
    set((state) => ({ favorites: [...state.favorites, favorite] })),
  removeFavorite: (courseId) =>
    set((state) => ({
      favorites: state.favorites.filter((f) => f.course.id !== courseId),
    })),

  fetchFavorites: async (userId, token) => {
    if (!userId || !token) {
      set({ error: "Kullanıcı bilgisi veya token bulunamadı." });
      return;
    }
    try {
      set({ loading: true, error: null });
      const res = await fetch(`http://localhost:8080/api/favorites/user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data: FavoriteDto[] = await res.json();
      set({ favorites: data, loading: false });
    } catch (err) {
      set({ error: (err as Error).message, loading: false });
    }
  },

  toggleFavorite: async (courseId, course, userId, token) => {
    if (!userId || !token) {
      set({ error: "Kullanıcı bilgisi veya token bulunamadı." });
      return;
    }

    const state = get();
    const isFavorited = state.favorites.some((fav) => fav.course.id === courseId);
    set({ loading: true, error: null });

    try {
      if (isFavorited) {
        const res = await fetch(
          `http://localhost:8080/api/favorites?userId=${userId}&courseId=${courseId}`,
          { method: "DELETE", headers: { Authorization: `Bearer ${token}` } }
        );
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        get().removeFavorite(courseId);
      } else {
        const favoriteDto: FavoriteDto = { user: { id: userId }, course };
        const res = await fetch("http://localhost:8080/api/favorites", {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify(favoriteDto),
        });
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const newFavorite: FavoriteDto = await res.json();
        get().addFavorite(newFavorite);
      }
    } catch (err) {
      set({ error: (err as Error).message });
    } finally {
      set({ loading: false });
    }
  },
}));
 */