import { useEffect, useState, type ReactNode } from "react";
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
const BLOGGER_FEED_URL =
  "https://innovistametalfabriconix.blogspot.com/feeds/posts/default?alt=json";
const FEATURED_LABEL = "featured";
const LATEST_LABEL = "latest";
const MAX_FEATURED = 3;
const MAX_LATEST = 3;
const EXCERPT_MAX = 180;
const READ_WPM = 200;

type BloggerText = {
  $t: string;
};

type BloggerLink = {
  rel: string;
  href: string;
  title?: string;
  type?: string;
};

type BloggerCategory = {
  term: string;
};

type BloggerEntry = {
  id?: BloggerText;
  title?: BloggerText;
  summary?: BloggerText;
  content?: BloggerText;
  published?: BloggerText;
  updated?: BloggerText;
  link?: BloggerLink[];
  category?: BloggerCategory[];
  media$thumbnail?: {
    url?: string;
  };
};

type BloggerResponse = {
  feed?: {
    entry?: BloggerEntry[];
  };
};

const stripHtml = (html: string) => {
  return html
    .replaceAll(/<script[\s\S]*?<\/script>/gi, " ")
    .replaceAll(/<style[\s\S]*?<\/style>/gi, " ")
    .replaceAll(/<[^>]*>/g, " ")
    .replaceAll(/\s+/g, " ")
    .trim();
};

const buildJsonpUrl = (url: string, callbackName: string) => {
  const hasAlt = /[?&]alt=/i.test(url);
  let jsonpUrl = url;
  if (hasAlt) {
    jsonpUrl = url.replace(/([?&]alt=)([^&]+)/i, "$1json-in-script");
  } else {
    jsonpUrl += url.includes("?")
      ? "&alt=json-in-script"
      : "?alt=json-in-script";
  }
  const joiner = jsonpUrl.includes("?") ? "&" : "?";
  return `${jsonpUrl}${joiner}callback=${callbackName}`;
};

const fetchBloggerFeedJsonp = (url: string, timeoutMs = 12000) => {
  return new Promise<BloggerResponse>((resolve, reject) => {
    const callbackName = `__bloggerJsonp_${Date.now()}_${Math.random()
      .toString(16)
      .slice(2)}`;
    const script = document.createElement("script");
    const cleanup = () => {
      script.remove();
      delete (globalThis as Record<string, unknown>)[callbackName];
    };

    const timer = globalThis.setTimeout(() => {
      cleanup();
      reject(new Error("Blogger feed JSONP timeout"));
    }, timeoutMs);

    (globalThis as Record<string, unknown>)[callbackName] = (data: unknown) => {
      globalThis.clearTimeout(timer);
      cleanup();
      resolve(data as BloggerResponse);
    };

    script.src = buildJsonpUrl(url, callbackName);
    script.onerror = () => {
      globalThis.clearTimeout(timer);
      cleanup();
      reject(new Error("Blogger feed JSONP failed"));
    };
    document.body.appendChild(script);
  });
};

const IMG_SRC_DOUBLE_RE = /<img[^>]+src="([^"]+)"/i;
const IMG_SRC_SINGLE_RE = /<img[^>]+src='([^']+)'/i;

const extractFirstImageUrl = (html: string) => {
  const doubleQuote = IMG_SRC_DOUBLE_RE.exec(html);
  if (doubleQuote?.[1]) return doubleQuote[1];
  const singleQuote = IMG_SRC_SINGLE_RE.exec(html);
  return singleQuote?.[1] ?? "";
};

const upgradeBloggerImage = (url: string) => {
  if (!url) return "";
  return url
    .replace(/\/s\d+-w\d+-h\d+-c\//, "/w1200-h675-c/")
    .replace(/\/w\d+-h\d+-c\//, "/w1200-h675-c/");
};

const getEntryText = (entry: BloggerEntry) => {
  const summary = entry.summary?.$t ?? "";
  const content = entry.content?.$t ?? "";
  return stripHtml(summary || content);
};

const getEntryDate = (entry: BloggerEntry) => {
  return entry.published?.$t ?? entry.updated?.$t ?? "";
};

const getEntryTime = (entry: BloggerEntry) => {
  const raw = getEntryDate(entry);
  const parsed = new Date(raw);
  const time = parsed.getTime();
  return Number.isNaN(time) ? 0 : time;
};

const isSpecialLabel = (label: string) => {
  const normalized = label.trim().toLowerCase();
  return normalized === FEATURED_LABEL || normalized === LATEST_LABEL;
};

const getLabels = (entry: BloggerEntry) => {
  const labels: string[] = [];
  for (const category of entry.category ?? []) {
    if (category?.term) labels.push(category.term);
  }
  return labels;
};

const hasLabel = (labels: string[], targetLabel: string) => {
  const target = targetLabel.trim().toLowerCase();
  for (const label of labels) {
    if (label.toLowerCase() === target) return true;
  }
  return false;
};

const getCategoryLabel = (labels: string[]) => {
  for (const label of labels) {
    if (!isSpecialLabel(label)) return label;
  }
  return "General";
};

const getPostUrl = (entry: BloggerEntry) => {
  for (const link of entry.link ?? []) {
    if (link.rel === "alternate") return link.href;
  }
  return "";
};

const formatDate = (entry: BloggerEntry) => {
  const parsed = new Date(getEntryDate(entry));
  return Number.isNaN(parsed.getTime())
    ? "Unknown date"
    : parsed.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "2-digit",
      });
};

type NormalizedEntry = {
  entry: BloggerEntry;
  key: string;
};

const normalizeEntries = (entries: BloggerEntry[]) => {
  const normalized: NormalizedEntry[] = [];
  for (let i = 0; i < entries.length; i += 1) {
    const entry = entries[i];
    const key = entry.id?.$t ?? `entry-${i}`;
    normalized.push({ entry, key });
  }
  return normalized;
};

const sortEntriesByDate = (entries: NormalizedEntry[]) => {
  return [...entries].sort(
    (a, b) => getEntryTime(b.entry) - getEntryTime(a.entry),
  );
};

const buildFeaturedSet = (entries: NormalizedEntry[]) => {
  const featuredSet = new Set<string>();
  for (const item of entries) {
    if (featuredSet.size >= MAX_FEATURED) break;
    const labels = getLabels(item.entry);
    if (hasLabel(labels, FEATURED_LABEL)) {
      featuredSet.add(item.key);
    }
  }
  return featuredSet;
};

const buildLatestSet = (entries: NormalizedEntry[]) => {
  const latestSet = new Set<string>();
  for (const item of entries) {
    if (latestSet.size >= MAX_LATEST) break;
    latestSet.add(item.key);
  }
  return latestSet;
};

const toBlogItem = (
  entry: BloggerEntry,
  key: string,
  index: number,
  featuredSet: Set<string>,
  latestSet: Set<string>,
) => {
  const labels = getLabels(entry);
  const category = getCategoryLabel(labels);
  const isFeatured = featuredSet.has(key);
  const isLatest = !isFeatured && latestSet.has(key);

  const title = entry.title?.$t?.trim() || "Untitled";
  const contentHtml = entry.content?.$t ?? "";
  const text = getEntryText(entry);
  const excerpt =
    text.length > EXCERPT_MAX ? `${text.slice(0, EXCERPT_MAX - 3)}...` : text;

  const contentImage = extractFirstImageUrl(contentHtml);
  const thumbUrl = entry["media$thumbnail"]?.url ?? "";
  const coverImage = contentImage || upgradeBloggerImage(thumbUrl) || "";

  const postUrl = getPostUrl(entry);
  const words = text ? text.split(/\s+/).filter(Boolean).length : 0;
  const minutes = words ? Math.max(1, Math.round(words / READ_WPM)) : 0;

  return {
    id: index + 1,
    title,
    excerpt,
    date: formatDate(entry),
    readTime: minutes ? `${minutes} min read` : "Quick read",
    category,
    coverImage,
    hashnodeUrl: postUrl,
    featured: isFeatured,
    latest: isLatest,
  };
};

const buildBlogItems = (entries: BloggerEntry[]) => {
  const normalized = normalizeEntries(entries);
  const sorted = sortEntriesByDate(normalized);
  const featuredSet = buildFeaturedSet(normalized);
  const latestSet = buildLatestSet(sorted);
  return sorted.map((item, index) =>
    toBlogItem(item.entry, item.key, index, featuredSet, latestSet),
  );
};

function Blogs() {
  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      try {
        setIsLoading(true);
        const json = await fetchBloggerFeedJsonp(BLOGGER_FEED_URL);
        const entries = json.feed?.entry ?? [];
        const mapped = buildBlogItems(entries);
        if (isMounted) setBlogs(mapped);
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

  const featured = blogs.filter((b) => b.featured);
  const latest = blogs.filter((b) => b.latest);
  const mainBlogs = blogs;
  const visibleBlogs = mainBlogs.slice(0, visibleCount);
  const canLoadMore = visibleCount < mainBlogs.length;

  let mainContent: ReactNode;
  if (isLoading) {
    mainContent = <div className={styles.loading}>Loading blogs...</div>;
  } else if (visibleBlogs.length === 0) {
    mainContent = <div className={styles.empty}>No blogs available yet.</div>;
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
