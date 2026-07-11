import { useEffect, useState } from "react";
import styles from "../cssModules/BlogSection.module.css";
import MainHeading from "./MainHeading";
import type { BlogMetaData } from "../assets/Blogs/BlogsMetaData";
import defaultBlogImage from "../assets/Blogs/images/blog.jpg";
import { fetchBloggerFeedJsonp } from "../utils/bloggerFeed";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import BlogCard from "./BlogCard";

import "swiper/swiper-bundle.css";

const HOME_FEED_URL =
  "https://innovistametalfabriconix.blogspot.com/feeds/posts/default/-/home?alt=json";
const MAX_HOME_BLOGS = 6;

type BloggerText = {
  $t: string;
};

type BloggerLink = {
  rel: string;
  href: string;
};

type BloggerEntry = {
  title?: BloggerText;
  content?: BloggerText;
  published?: BloggerText;
  updated?: BloggerText;
  link?: BloggerLink[];
  media$thumbnail?: {
    url?: string;
  };
};

type BloggerResponse = {
  feed?: {
    entry?: BloggerEntry[];
  };
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

const getPostUrl = (entry: BloggerEntry) => {
  for (const link of entry.link ?? []) {
    if (link.rel === "alternate") return link.href;
  }
  return "";
};

const getEntryDate = (entry: BloggerEntry) => {
  return entry.published?.$t ?? entry.updated?.$t ?? "";
};

const formatDate = (entry: BloggerEntry) => {
  const parsed = new Date(getEntryDate(entry));
  return Number.isNaN(parsed.getTime())
    ? "Unknown date"
    : parsed.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "2-digit",
      });
};

const mapToBlogCard = (entry: BloggerEntry, index: number): BlogMetaData => {
  const title = entry.title?.$t?.trim() || "Untitled";
  const contentHtml = entry.content?.$t ?? "";
  const contentImage = extractFirstImageUrl(contentHtml);
  const thumbUrl = entry.media$thumbnail?.url ?? "";
  const image =
    contentImage || upgradeBloggerImage(thumbUrl) || defaultBlogImage;
  const link = getPostUrl(entry);

  return {
    id: index + 1,
    date: formatDate(entry),
    title,
    image,
    link,
  };
};

function BlogSection() {
  const [blogs, setBlogs] = useState<BlogMetaData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      try {
        setIsLoading(true);
        const json =
          await fetchBloggerFeedJsonp<BloggerResponse>(HOME_FEED_URL);
        const entries = json.feed?.entry ?? [];
        const cards = entries
          .slice(0, MAX_HOME_BLOGS)
          .map((entry, index) => mapToBlogCard(entry, index));
        if (isMounted) setBlogs(cards);
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

  return (
    <div className={styles.container}>
      <MainHeading
        heading="Challenges We Conquer, Solutions We Deliver"
        description="Discover how Innovista Fabriconix addresses the most common challenges in aluminum fabrication with innovative, lasting solutions."
      />
      <div className={styles.blogCardsContainer}>
        {isLoading ? (
          <div className={styles.status}>Loading blogs...</div>
        ) : blogs.length === 0 ? (
          <div className={styles.status}>No blogs available yet.</div>
        ) : (
          <>
            <Swiper
              modules={[Autoplay, Pagination]}
              spaceBetween={28}
              slidesPerView={3}
              pagination={{
                clickable: true,
                dynamicBullets: false,
              }}
              autoplay={{ delay: 8000, pauseOnMouseEnter: true }}
              breakpoints={{
                0: { slidesPerView: 1, spaceBetween: 16 },
                640: { slidesPerView: 2, spaceBetween: 20 },
                1024: { slidesPerView: 3, spaceBetween: 28 },
              }}
            >
              {blogs.map((blog) => (
                <SwiperSlide key={blog.id}>
                  <BlogCard blog={blog} />
                </SwiperSlide>
              ))}
            </Swiper>
            <div className={styles.paginationContainer}>
              <div className={styles.pagination}></div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default BlogSection;
