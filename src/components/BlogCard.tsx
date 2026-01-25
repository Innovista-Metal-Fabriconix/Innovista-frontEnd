import type { BlogMetaData } from "../assets/Blogs/BlogsMetaData";

type Props = {  
  blog: BlogMetaData;
};

const BlogCard = ({ blog }: Props) => {
  return (
    <a
      href={blog.link}
      target="_blank"
      rel="noopener noreferrer"
      className="block group"
    >
      <div className="rounded-xl overflow-hidden shadow-md hover:shadow-xl transition">
        <img
          src={blog.image}
          alt={blog.title}
          className="h-48 w-full object-cover group-hover:scale-105 transition"
        />
        <div className="p-4">
          <p className="text-sm text-gray-500">{blog.date}</p>
          <h3 className="font-semibold mt-2">{blog.title}</h3>
        </div>
      </div>
    </a>
  );
};

export default BlogCard;
