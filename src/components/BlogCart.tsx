import React from "react";
import type { Blog } from "../stores/useBlogStore";

interface BlogCartProps {
  blog: Blog;
  
}

const BlogCart = ({ blog }: BlogCartProps) => {
  return (
    <div
      className="rounded-2xl shadow-md p-4 mb-4 cursor-pointer hover:shadow-lg transition"
      onClick={() => window.open(blog.url, "_blank")}
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-2">
        <h2 className="text-lg font-semibold text-gray-800">{blog.title}</h2>
      </div>

      {/* Image */}
      {blog.imageSrc && (
        <img
          src={blog.imageSrc}
          alt={blog.imageAlt || "blog image"}
          className="w-full h-48 object-cover rounded-lg mb-3"
        />
      )}

      {/* Footer */}
      <div className="text-sm text-gray-500 mb-2">
        {blog.createdAt && (
          <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
        )}
      </div>

      {/* Tags */}
      {blog.tags && blog.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {blog.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogCart;