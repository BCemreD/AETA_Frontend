import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCourseStore } from "../stores/useCourseStore";
import type { Course } from "../stores/useCourseStore";
import { useBlogStore } from "../stores/useBlogStore";
import type { Blog } from "../stores/useBlogStore";
import CourseCart from "../components/CourseCart";
import BlogCart from "../components/BlogCart";
import Chatbox from "../components/chatbox/Chatbox";

export default function HomePage() {
  const { courses, fetchCourses, loading: courseLoading, error: courseError } = useCourseStore();
  const { blogs, fetchBlogs, loading: blogLoading, error: blogError } = useBlogStore();

  const [selectedTagId, setSelectedTagId] = useState<number | null>(null);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([]);

  // Initial fetch
  useEffect(() => {
    fetchCourses();
    fetchBlogs();
  }, [fetchCourses, fetchBlogs]);

  // Fetch by selected tagId
  useEffect(() => {
    if (!selectedTagId) {
      setFilteredCourses([]);
      setFilteredBlogs([]);
      return;
    }

    fetch(`http://localhost:8080/api/courses/tag/${selectedTagId}`)
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch courses by tag");
        return res.json();
      })
      .then(data => setFilteredCourses(data))
      .catch(err => console.error(err));

    fetch(`http://localhost:8080/api/blogs/tag/${selectedTagId}`)
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch blogs by tag");
        return res.json();
      })
      .then(data => setFilteredBlogs(data))
      .catch(err => console.error(err));
  }, [selectedTagId]);

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
            {(selectedTagId ? filteredCourses : courses.slice(0, 6)).map(course => (
              <CourseCart key={course.id} course={course} />
            ))}
          </div>
          {!selectedTagId && (
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
            <Chatbox onTagSelect={setSelectedTagId} />
          </div>
        </div>

        {/* Blog */}
        <div className="col-span-full lg:col-span-2 space-y-6">
          <div className="border border-gray-200 shadow-sm p-6 rounded-2xl bg-white">
            <h3 className="text-xl font-semibold mb-4">Blog</h3>
            <div className="grid grid-cols-1 gap-6">
              {(selectedTagId ? filteredBlogs : blogs.slice(0, 6)).map(blog => (
                <BlogCart key={blog.id} blog={blog} />
              ))}
            </div>
            {!selectedTagId && (
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
