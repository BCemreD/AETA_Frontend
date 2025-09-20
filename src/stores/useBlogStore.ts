import { create } from "zustand";
import { API_BASE_URL } from "../utils/config";

export interface Blog {
  id: number;
  title: string;
  imageSrc: string;
  imageAlt: string;
  url: string;
  tags: string[];
  categories: string[];
  createdAt: string;
}


interface BlogState {
  blogs: Blog[];
  loading: boolean;
  error: string | null;
  fetchBlogs: () => Promise<void>;
}

export const useBlogStore = create<BlogState>((set) => ({
  blogs: [],
  loading: false,
  error: null,
  fetchBlogs: async () => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`${API_BASE_URL}/api/blogs`);
      if (!response.ok) {
        throw new Error("Failed to fetch blogs");
      }
      const data = await response.json();
      set({ blogs: data, loading: false });
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },
}));