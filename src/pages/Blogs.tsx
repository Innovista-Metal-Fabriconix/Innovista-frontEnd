import { useEffect, useMemo, useState, type ReactNode } from "react";
import styles from "../cssModules/BlogsPage.module.css";

type BlogItem = {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  coverImage: string;
  hashnodeUrl: string;
  featured: boolean;
  latest: boolean;
};

const INITIAL_VISIBLE = 6;
const LOAD_STEP = 6;

function Blogs() {
  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const [query, setQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      try {
        setIsLoading(true);
        const res = await fetch("/blogs.json");
        const data = (await res.json()) as BlogItem[];
        if (isMounted) setBlogs(data);
      } catch {
        if (isMounted) setBlogs([]);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };
    load();
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    setVisibleCount(INITIAL_VISIBLE);
  }, [query]);

  const normalizedQuery = query.trim().toLowerCase();

  const filtered = useMemo(() => {
    if (!normalizedQuery) return blogs;
    return blogs.filter((blog) => {
      const haystack =
        `${blog.title} ${blog.excerpt} ${blog.category}`.toLowerCase();
      return haystack.includes(normalizedQuery);
    });
  }, [blogs, normalizedQuery]);

  const featured = filtered.filter((b) => b.featured);
  const latest = filtered.filter((b) => b.latest);
  const mainBlogs = filtered.filter((b) => !b.featured && !b.latest);
  const visibleBlogs = mainBlogs.slice(0, visibleCount);
  const canLoadMore = visibleCount < mainBlogs.length;

  let mainContent: ReactNode;
  if (isLoading) {
    mainContent = <div className={styles.loading}>Loading blogs...</div>;
  } else if (visibleBlogs.length === 0) {
    mainContent = (
      <div className={styles.empty}>No blogs match your search.</div>
    );
  } else {
    mainContent = (
      <div className={styles.grid}>
        {visibleBlogs.map((blog) => (
          <article key={blog.id} className={styles.card}>
            <div className={styles.cardImage}>
              <img src={blog.coverImage} alt={blog.title} loading="lazy" />
              <span className={styles.tag}>{blog.category}</span>
            </div>
            <div className={styles.cardBody}>
              <p className={styles.meta}>
                {blog.date} • {blog.readTime}
              </p>
              <h3>{blog.title}</h3>
              <p className={styles.excerpt}>{blog.excerpt}</p>
              <a
                href={blog.hashnodeUrl}
                target="_blank"
                rel="noreferrer noopener"
                className={styles.readLink}
              >
                Read now
              </a>
            </div>
          </article>
        ))}
      </div>
    );
  }

  return (
    <div>
      <Link to="/admin-home">Back to Home</Link>
      <h2>Hellow</h2>
    </div>
  );
}

export default Blogs;
