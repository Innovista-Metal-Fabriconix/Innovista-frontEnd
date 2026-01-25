import type { BlogMetaData } from "../assets/Blogs/BlogsMetaData";
import styles from "../cssModules/BlogCard.module.css";

type Props = {
  blog: BlogMetaData;
};

const BlogCard = ({ blog }: Props) => {
  return (
    <a
      href={blog.link}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.card}
    >
      <div className={styles.imageWrapper}>
        <img src={blog.image} alt={blog.title} className={styles.image} />
        <div className={styles.overlay}></div>
        <div className={styles.dateTag}>{blog.date}</div>
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{blog.title}</h3>
        <span className={styles.readMore}>
          Read More
          <svg
            className={styles.arrow}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </span>
      </div>
    </a>
  );
};

export default BlogCard;
