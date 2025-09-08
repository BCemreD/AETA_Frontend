import React, { useEffect, useState } from "react";
import { useSearchStore } from "../stores/useSearchStore";
import CourseCart from "../components/CourseCart";
import BlogCart from "../components/BlogCart";
import Chatbox from "../components/chatbox/Chatbox";
import PromptBar from "../components/chatbox/PromptBar";

const HomePage: React.FC = () => {
  const { courses, blogs, chat, loading, error, fetchDefault, search } = useSearchStore();
  const [selectedTagId, setSelectedTagId] = useState<number | null>(null);

  useEffect(() => {
    fetchDefault();
  }, [fetchDefault]);

  const handleSearch = (query: string) => {
    search(query, selectedTagId || undefined);
  };

  return (
    <div className="mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-8 gap-8">

        {/* Courses */}
        <div className="col-span-full lg:col-span-2">
          <h3 className="text-xl font-semibold mb-4">Önerilen Eğitimler</h3>
          <div className="grid grid-cols-1 gap-6">
            {courses.map(c => <CourseCart key={c.id} course={c} />)}
          </div>
        </div>

        {/* Chatbox */}
        <div className="col-span-full lg:col-span-4 self-center space-y-6">
          <PromptBar onSubmit={handleSearch} />
          <Chatbox/>
        </div>

        {/* Blogs */}
        <div className="col-span-full lg:col-span-2 space-y-6">
          <h3 className="text-xl font-semibold mb-4">Blog</h3>
          <div className="grid grid-cols-1 gap-6">
            {blogs.map(b => <BlogCart key={b.id} blog={b} />)}
          </div>
        </div>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
    </div>
  );
};

export default HomePage;
