import { create } from "zustand";

interface SearchState {
  courses: any[];
  blogs: any[];
  chat: { from: "user" | "bot"; text: string }[];
  loading: boolean;
  error: string | null;
  search: (
    query: string,
    tagIds?: number[],
    categoryIds?: number[],
    preparedPromptText?: string
  ) => Promise<void>;
  fetchDefault: () => Promise<void>;
}

export const useSearchStore = create<SearchState>((set, get) => ({
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
        fetch("http://localhost:8080/api/blogs"),
      ]);
      if (!coursesRes.ok || !blogsRes.ok)
        throw new Error("Failed to fetch default data");

      const courses = await coursesRes.json();
      const blogs = await blogsRes.json();
      set({ courses, blogs, loading: false });
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  search: async (query, tagIds, categoryIds, preparedPromptText) => {
    const isSearchAction =
      query || (tagIds && tagIds.length > 0) || (categoryIds && categoryIds.length > 0);

    if (!isSearchAction) return; // ignore null

    set({ loading: true, error: null });

    try {
      const res = await fetch("http://localhost:8080/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query, tagIds, categoryIds }),
      });

      if (!res.ok) throw new Error("Search failed");

      const data = await res.json();

      set((state) => ({
        courses: data.courses,
        blogs: data.blogs,
        chat: [
          ...state.chat,
          { from: "user", text: query || preparedPromptText || "" },
          { from: "bot", text: data.botMessage ?? "Sonuç bulunamadı." },
        ],
        loading: false,
      }));
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
    console.log({ query, tagIds, categoryIds })
  },
}));
