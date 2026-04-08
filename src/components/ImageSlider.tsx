import { useEffect, useState, useCallback } from "react";
import styles from "../cssModules/ImageSlider.module.css";
import image1 from "../assets/Images/ImageSlider/image1.jpg";
import image2 from "../assets/Images/ImageSlider/image2.png";
import image3 from "../assets/Images/ImageSlider/image3.png";
import image4 from "../assets/Images/ImageSlider/image4.png";
import image5 from "../assets/Images/ImageSlider/image5.png";
import CountUpComp from "./CountUpComp";
import { useNavigate } from "react-router-dom";
import ContactButton from "./ContactButton";
import ContactModal from "./ContactModal";

const images = [image1, image2, image3, image4, image5];

export default function ImageSlider() {
  const [current, setCurrent] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const navigate = useNavigate();

  const goToSlide = useCallback((index: number) => {
    setCurrent(index);
  }, []);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, []);

  const prevSlide = useCallback(() => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, []);

  const togglePlayPause = useCallback(() => {
    setIsPlaying((prev) => !prev);
  }, []);

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(nextSlide, 10000);
    return () => clearInterval(interval);
  }, [isPlaying, nextSlide]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowLeft":
          prevSlide();
          break;
        case "ArrowRight":
          nextSlide();
          break;
        case " ":
          e.preventDefault();
          break;
      }
    };

    globalThis.addEventListener("keydown", handleKeyPress);
    return () => globalThis.removeEventListener("keydown", handleKeyPress);
  }, [prevSlide, nextSlide, togglePlayPause]);

  return (
    <div className={styles.sliderContainer}>
      <div className={styles.imageWrapper}>
        {images.map((img, index) => (
          <img
            key={img}
            src={img}
            alt={`Slide ${index + 1}`}
            className={`${styles.sliderImage} ${
              current === index ? styles.active : ""
            }`}
            loading={index === 0 ? "eager" : "lazy"}
          />
        ))}
      </div>

      <div className={styles.contentContainer}>
        <div className={styles.statContainer}>
          <CountUpComp number={20} title="years experience" />
          <CountUpComp number={40} title="Successful Projects" />
          <CountUpComp number={32} title="active Clients" />
        </div>
        <span className={styles.mainHeading}>
          Precision Crafted Aluminium & Metal Solutions
        </span>
        <span className={styles.description}>
          Delivering high quality aluminium and metal fabrication for doors,
          windows, partitions, and custom designs. Our work combines durability,
          style, and precision engineering to bring your architectural vision to
          life built to last for decades.
        </span>
        <div className={styles.buttonGroup}>
          <ContactButton
            onClick={() => {
              setIsContactModalOpen(true);
            }}
          />
          <button
            className={`${styles.exploreBtn} cursor-target`}
            onClick={() => {
              navigate("/products");
            }}
          >
            Explore Our Products
          </button>
        </div>
      </div>

      <div className={styles.controlsContainer}>
        <div className={styles.buttonContainer}>
          {images.map((img, index) => (
            <button
              key={img}
              onClick={() => goToSlide(index)}
              className={styles.dotButton}
              aria-label={`Go to slide ${index + 1}`}
            >
              <div className={styles.dotBackground} />

              {current === index && (
                <>
                  <div className={styles.dotActive} />
                  {isPlaying && <div className={styles.dotProgress} />}
                </>
              )}
            </button>
          ))}
        </div>
      </div>

      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </div>
  );
}
