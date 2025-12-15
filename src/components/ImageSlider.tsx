import { useEffect, useState, useCallback, use } from "react";
import styles from "../cssModules/ImageSlider.module.css";
import image1 from "../assets/Images/ImageSlider/image1.jpg";
import image2 from "../assets/Images/ImageSlider/image2.png";
import image3 from "../assets/Images/ImageSlider/image3.png";
import image4 from "../assets/Images/ImageSlider/image4.png";
import image5 from "../assets/Images/ImageSlider/image5.png";
import CountUpComp from "./CountUpComp";
import { useNavigate } from "react-router-dom";
import ContactButton from "./ContactButton";

const images = [image1, image2, image3, image4, image5];

export default function ImageSlider() {
  const [current, setCurrent] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(0);
  const navigate = useNavigate();
  const goToSlide = useCallback((index: number) => {
    setCurrent(index);
    setProgress(0);
  }, []);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    setProgress(0);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    setProgress(0);
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
    if (!isPlaying) return;

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 0;
        return prev + 100 / 60;
      });
    }, 100);

    return () => clearInterval(progressInterval);
  }, [current, isPlaying]);

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

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [prevSlide, nextSlide, togglePlayPause]);

  return (
    <div className={styles.sliderContainer}>
      <div className={styles.imageWrapper}>
        {images.map((img, index) => (
          <img
            key={index}
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
            size="small"
            variant="accent"
            onClick={() => {
              navigate("/contact");
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
          {images.map((_, index) => (
            <button
              key={index}
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
    </div>
  );
}
