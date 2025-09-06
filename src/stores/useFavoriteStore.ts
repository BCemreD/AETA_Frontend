import { create } from "zustand";

interface FavoriteDto {
  id: number;
  user: { id: number };
  course: { id: number }; 
}

interface FavoriteState {
  favorites: FavoriteDto[];
  loading: boolean;
  error: string | null;
  setFavorites: (favorites: FavoriteDto[]) => void;
  addFavorite: (favorite: FavoriteDto) => void;
  removeFavorite: (courseId: number) => void;
  fetchFavorites: (userId: number, token: string) => Promise<void>;
}

export const useFavoriteStore = create<FavoriteState>((set) => ({
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
}));