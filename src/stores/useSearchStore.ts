import { create } from "zustand";

export interface Course {
  id: number;
  title: string;
  imageSrc: string;
  imageAlt: string;
  url: string;
  tags: string[];
  categories: string[];
}

export interface Blog {
  id: number;
  title: string;
  imageSrc: string;
  imageAlt: string;
  url: string;
  tags: string[];
  categories: string[]; 
}


interface ChatMessage {
  from: "user" | "bot";
  text: string;
}

interface SearchState {
  courses: Course[];
  blogs: Blog[];
  chat: ChatMessage[];
  loading: boolean;
  error: string | null;
  search: (query: string, tagId?: number) => Promise<void>;
  fetchDefault: () => Promise<void>;
}

export const useSearchStore = create<SearchState>((set) => ({
  courses: [],
  blogs: [],
  chat: [],
  loading: false,
  error: null,

  fetchDefault: async () => {
    set({ loading: true, error: null });
    try {
      const [coursesRes, blogsRes] = await Promise.all([
        fetch("http://localhost:8080/api/courses"),
        fetch("http://localhost:8080/api/blogs")
      ]);
      if (!coursesRes.ok || !blogsRes.ok) throw new Error("Failed to fetch default data");
      const courses = await coursesRes.json();
      const blogs = await blogsRes.json();
      set({ courses, blogs, loading: false });
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  search: async (query, tagId) => {
    set((state) => ({
      chat: query ? [...state.chat, { from: "user", text: query }] : state.chat,
      loading: true,
      error: null,
    }));
    try {
      const res = await fetch("http://localhost:8080/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query, tagId }),
      });
      if (!res.ok) throw new Error("Search failed");
      const data = await res.json(); // { courses: [], blogs: [], botMessage: "" }
      set((state) => ({
        courses: data.courses,
        blogs: data.blogs,
        chat: query ? [...state.chat, { from: "bot", text: data.botMessage }] : state.chat,
        loading: false,
      }));
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },
}));
