import React from "react";
import styles from "../cssModules/BlogSection.module.css";
import MainHeading from "./MainHeading";
import blogsMetaData from "../assets/Blogs/BlogsMetaData";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import BlogCard from "./BlogCard";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

function BlogSection() {
  return (
    <div className={styles.container}>
      <MainHeading
        heading="Challenges We Conquer, Solutions We Deliver"
        description="Discover how Innovista Fabriconix addresses the most common challenges in aluminum fabrication with innovative, lasting solutions."
      />
      <div className={styles.blogCardsContainer}>
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={24}
          slidesPerView={3}
          navigation
          autoplay={{ delay: 4000 }}
          breakpoints={{
            0: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {blogsMetaData.map((blog) => (
            <SwiperSlide key={blog.id}>
              <BlogCard blog={blog} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default BlogSection;
