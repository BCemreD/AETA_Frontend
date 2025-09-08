import { create } from "zustand";

export interface Blog {
  id: number;
  title: string;
  imageSrc: string;
  imageAlt: string;
  url: string;
  tags: string[];
  categories: string[];
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
      const response = await fetch("http://localhost:8080/api/blogs");
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