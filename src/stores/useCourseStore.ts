import { create } from "zustand";
import { API_BASE_URL } from "../utils/config";

export interface Course {
  id: number;
  title: string;
  imageSrc: string;
  imageAlt: string;
  url: string;
  tags: string[];
  categories: string[];
  createdAt: string;
}

interface CourseState {
  courses: Course[];
  loading: boolean;
  error: string | null;
  fetchCourses: () => Promise<void>;
}

export const useCourseStore = create<CourseState>((set) => ({
  courses: [],
  loading: false,
  error: null,
  fetchCourses: async () => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`${API_BASE_URL}/api/courses`);
      if (!response.ok) {
        throw new Error("Failed to fetch courses");
      }
      const data = await response.json();
      set({ courses: data, loading: false });
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },
}));