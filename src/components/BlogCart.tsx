import React from "react";
import type { Blog } from "../stores/useBlogStore";
import ImageHolder from "./chatbox/ImageHolder";
import { getImageUrl } from "../utils/utils";

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
        <h2 className="text-lg font-semibold text-[#253342]">{blog.title}</h2>
      </div>

      {/* Image */}
      <ImageHolder
        src={getImageUrl(blog.imageSrc)}
        alt={blog.imageAlt || "Blog image"}
      />

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
              className="text-xs bg-gray-200 text-[#253342] px-2 py-1 rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Categories */}
      {blog.categories && blog.categories.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {blog.categories.map((category) => (
            <span
              key={category}
              className="text-xs bg-gray-200 text-[#253342] px-2 py-1 rounded-full"
            >
              #{category}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogCart;