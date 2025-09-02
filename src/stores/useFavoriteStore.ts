import { create } from "zustand";

interface Favorite {
  id: number;
  courseId: number;
}

interface FavoriteState {
  favorites: Favorite[];
  setFavorites: (favorites: Favorite[]) => void;
  addFavorite: (favorite: Favorite) => void;
  removeFavorite: (courseId: number) => void;
}

export const useFavoriteStore = create<FavoriteState>((set) => ({
  favorites: [],
  setFavorites: (favorites) => set({ favorites }),
  addFavorite: (favorite) =>
    set((state) => ({ favorites: [...state.favorites, favorite] })),
  removeFavorite: (courseId) =>
    set((state) => ({
      favorites: state.favorites.filter((f) => f.courseId !== courseId),
    })),
}));
