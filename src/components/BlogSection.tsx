import styles from "../cssModules/BlogSection.module.css";
import MainHeading from "./MainHeading";
import blogsMetaData from "../assets/Blogs/BlogsMetaData";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import BlogCard from "./BlogCard";

import "swiper/swiper-bundle.css";

function BlogSection() {
  return (
    <div className={styles.container}>
      <MainHeading
        heading="Challenges We Conquer, Solutions We Deliver"
        description="Discover how Innovista Fabriconix addresses the most common challenges in aluminum fabrication with innovative, lasting solutions."
      />
      <div className={styles.blogCardsContainer}>
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
          {blogsMetaData.map((blog) => (
            <SwiperSlide key={blog.id}>
              <BlogCard blog={blog} />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className={styles.paginationContainer}>
          <div className={styles.pagination}></div>
        </div>
      </div>
    </div>
  );
}

export default BlogSection;
