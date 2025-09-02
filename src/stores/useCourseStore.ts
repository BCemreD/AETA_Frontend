import { create } from "zustand";

interface Course {
  id: number;
  title: string;
  imageSrc: string;
  imageAlt: string;
  url: string;
  tags: string[];
}

interface CourseState {
  courses: Course[];
  setCourses: (courses: Course[]) => void;
  filterByTag: (tag: string) => Course[];
}

export const useCourseStore = create<CourseState>((set, get) => ({
  courses: [],
  setCourses: (courses) => set({ courses }),
  filterByTag: (tag) =>
    get().courses.filter((course) => course.tags.includes(tag)),
}));
