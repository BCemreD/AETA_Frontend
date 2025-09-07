import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCourseStore} from "../stores/useCourseStore";
import type { Course } from "../stores/useCourseStore";
import { useBlogStore } from "../stores/useBlogStore";
import type {Blog} from "../stores/useBlogStore";
import CourseCart from "../components/CourseCart";
import BlogCart from "../components/BlogCart";
import Chatbox from "../components/chatbox/Chatbox";


const tagIds: Record<string, number> = {
  Java: 1,
  "Spring Boot": 2,
  Frontend: 3,
  Cloud: 4,
  "Data Science": 5,
  Python: 6,
  Nodejs: 7,
  "Web Geliştirme": 8,
  React: 9,
  Vue: 10,
  Angular: 11,
  "Machine Learning": 12,
  ETL: 13,
  "HTML/CSS": 14,
  JS: 15,
  Frameworks: 16
};

export default function HomePage() {
  const { courses, fetchCourses, loading: courseLoading, error: courseError } = useCourseStore();
  const { blogs, fetchBlogs, loading: blogLoading, error: blogError } = useBlogStore();

  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(null);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([]);

  // Initial fetch
  useEffect(() => {
    fetchCourses();
    fetchBlogs();
  }, [fetchCourses, fetchBlogs]);

  // Fetch by selected tagId
  useEffect(() => {
    if (!selectedSubCategory) {
      setFilteredCourses([]);
      setFilteredBlogs([]);
      return;
    }

    const tagId = tagIds[selectedSubCategory];
    if (!tagId) return;

    fetch(`http://localhost:8080/api/courses/tag/${tagId}`)
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch courses by tag");
        return res.json();
      })
      .then(data => setFilteredCourses(data))
      .catch(err => console.error(err));

    fetch(`http://localhost:8080/api/blogs/tag/${tagId}`)
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch blogs by tag");
        return res.json();
      })
      .then(data => setFilteredBlogs(data))
      .catch(err => console.error(err));
  }, [selectedSubCategory]);

  if (courseLoading || blogLoading) return <p>Loading...</p>;
  if (courseError) return <p>Error loading courses: {courseError}</p>;
  if (blogError) return <p>Error loading blogs: {blogError}</p>;

  return (
    <div className="mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-bold mb-8 pt-4">Home</h2>

      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-8 gap-8">
        {/* Courses */}
        <div className="col-span-full lg:col-span-2">
          <h3 className="text-xl font-semibold mb-4">Önerilen Eğitimler</h3>
          <div className="grid grid-cols-1 gap-6">
            {(selectedSubCategory ? filteredCourses : courses.slice(0, 6)).map(course => (
              <CourseCart key={course.id} course={course} />
            ))}
          </div>
          {!selectedSubCategory && (
            <div className="text-left mt-6">
              <Link to="/courses" className="text-blue-600 hover:underline font-medium">
                Tüm eğitimler &gt;
              </Link>
            </div>
          )}
        </div>

        {/* Chatbox */}
        <div className="col-span-full lg:col-span-4 space-y-6">
          <div className="border border-gray-200 shadow-sm p-6 rounded-2xl bg-white">
            <h3 className="text-xl font-semibold mb-4">Bana Soru Sor</h3>
            <Chatbox onSubCategorySelect={setSelectedSubCategory} />
          </div>
        </div>

        {/* Blog */}
        <div className="col-span-full lg:col-span-2 space-y-6">
          <div className="border border-gray-200 shadow-sm p-6 rounded-2xl bg-white">
            <h3 className="text-xl font-semibold mb-4">Blog</h3>
            <div className="grid grid-cols-1 gap-6">
              {(selectedSubCategory ? filteredBlogs : blogs.slice(0, 6)).map(blog => (
                <BlogCart key={blog.id} blog={blog} />
              ))}
            </div>
            {!selectedSubCategory && (
              <div className="text-left mt-6">
                <Link to="/blogs" className="text-blue-600 hover:underline font-medium">
                  Tüm yazılar &gt;
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
