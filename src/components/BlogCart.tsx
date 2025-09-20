import type { Blog } from "../stores/useBlogStore";
import ImageHolder from "./chatbox/ImageHolder";
import { getImageUrl } from "../utils/utils";
import Tag from "./Tag";
import Category from "./Category"

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

   {/*Tags & Categories */}

        {blog.tags && blog.tags.length > 0 && <Tag tags={blog.tags} />}
        {blog.categories && blog.categories.length > 0 && <Category categories={blog.categories} />}
    </div>
  );
};

export default BlogCart;