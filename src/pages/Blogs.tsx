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
    <div className={styles.page}>
      <section className={styles.hero}>
        <img
          src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1800&auto=format&fit=crop"
          alt="Discover our latest blogs"
        />
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <h1>Discover Our Latest Blogs</h1>
          <p>
            Read our latest stories, trends, and solutions in aluminum and
            fabrication that shape modern living.
          </p>
          <div className={styles.searchBar}>
            <input
              type="search"
              placeholder="Find a blog"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search blogs"
            />
            <button type="button" aria-label="Search">
              Search
            </button>
          </div>
        </div>
      </section>

      <section className={styles.content}>
        <div className={styles.main}>
          <div className={styles.sectionHeader}>
            <h2>Explore Our Knowledge Hub</h2>
            <span className={styles.sectionLine} />
          </div>

          {mainContent}

          {canLoadMore && (
            <button
              type="button"
              className={styles.loadMore}
              onClick={() => setVisibleCount((prev) => prev + LOAD_STEP)}
            >
              Load More
            </button>
          )}
        </div>

        <aside className={styles.sidebar}>
          <div className={styles.sectionHeader}>
            <h3>Featured</h3>
            <span className={styles.sectionLine} />
          </div>
          <div className={styles.list}>
            {featured.map((blog) => (
              <a
                key={blog.id}
                href={blog.hashnodeUrl}
                target="_blank"
                rel="noreferrer noopener"
                className={styles.listItem}
              >
                <img src={blog.coverImage} alt={blog.title} loading="lazy" />
                <div>
                  <span className={styles.metaSmall}>{blog.date}</span>
                  <p>{blog.title}</p>
                </div>
              </a>
            ))}
          </div>

          <div className={styles.sectionHeader}>
            <h3>Latest</h3>
            <span className={styles.sectionLine} />
          </div>
          <div className={styles.list}>
            {latest.map((blog) => (
              <a
                key={blog.id}
                href={blog.hashnodeUrl}
                target="_blank"
                rel="noreferrer noopener"
                className={styles.listItem}
              >
                <img src={blog.coverImage} alt={blog.title} loading="lazy" />
                <div>
                  <span className={styles.metaSmall}>{blog.date}</span>
                  <p>{blog.title}</p>
                </div>
              </a>
            ))}
          </div>
        </aside>
      </section>
    </div>
  );
}

export default Blogs;
