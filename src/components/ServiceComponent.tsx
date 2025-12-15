import styles from "../cssModules/ServiceComponet.module.css";
import { useEffect, useRef, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type Service = {
  image: string;
  title: string;
  description1: string;
  description2: string;
};

gsap.registerPlugin(ScrollTrigger);

function ServiceComponent({
  items,
  duration = 5000,
}: {
  items: Service[];
  duration?: number;
}) {
  const [index, setIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [displayItems, setDisplayItems] = useState<Service[]>([]);

  const textRefs = useRef<(HTMLDivElement | HTMLSpanElement)[]>([]);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isAnimating) return;

    const updateItems = () => {
      const endIndex = index + 4;
      let currentItems;
      if (endIndex <= items.length) {
        currentItems = items.slice(index, endIndex);
      } else {
        currentItems = [
          ...items.slice(index, items.length),
          ...items.slice(0, endIndex - items.length),
        ];
      }
      setDisplayItems(currentItems);
    };

    updateItems();

    const timeout = setTimeout(() => {
      setIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, duration);

    return () => clearTimeout(timeout);
  }, [index, isAnimating]);

  useEffect(() => {
    if (textRefs.current.length > 0) {
      const tl = gsap.timeline();

      tl.fromTo(
        textRefs.current[0],
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, ease: "power3.out" }
      )
        .fromTo(
          textRefs.current[1],
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.4, ease: "power3.out" },
          "+=0.1"
        )
        .fromTo(
          textRefs.current[2],
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.4, ease: "power3.out" },
          "+=0.1"
        );
    }
  }, [index]);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: contentRef.current,
        start: "top 50%",
        end: "top 30%",
        toggleActions: "play none none reverse",
        onEnter: () => setIsAnimating(true),
        onEnterBack: () => setIsAnimating(false),
      },
    });

    if (imageRef.current && textRefs.current.length > 0) {
      tl.fromTo(
        imageRef.current,
        { x: -150, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.2, ease: "power3.out" }
      );

      tl.fromTo(
        textRefs.current,
        { x: 100, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.2, ease: "power3.out" },
        "-=0.8"
      );
    }
  }, []);

  const goToService = (serviceIndex: number) => {
    setIndex(serviceIndex);
  };

  return (
    <div className={styles.container} ref={contentRef}>
      <div className={styles.imageContainer} ref={imageRef}>
        {displayItems.map((item, i) => (
          <img
            src={item.image}
            alt={item.title}
            key={`${index}-${i}`}
            className={styles[`image${i + 1}`]}
          />
        ))}
      </div>

      <div className={styles.textContainer}>
        <div className={styles.textContent}>
          <span
            className={styles.title}
            ref={(el) => { if (el) textRefs.current[0] = el; }}
          >
            {displayItems[0]?.title}
          </span>
          <p
            className={styles.description}
            ref={(el) => { if (el) textRefs.current[1] = el; }}
          >
            {displayItems[0]?.description1}
          </p>
          <p
            className={styles.description}
            ref={(el) => { if (el) textRefs.current[2] = el; }}
          >
            {displayItems[0]?.description2}
          </p>
        </div>

        <div className={styles.buttonContainer}>
          <button
            className={`${styles.prevButton} cursor-target`}
            onClick={() =>
              setIndex(
                (prevIndex) => (prevIndex - 1 + items.length) % items.length
              )
            }
          >
            <FaArrowLeft />
          </button>
          <button
            className={`${styles.nextButton} cursor-target`}
            onClick={() =>
              setIndex((prevIndex) => (prevIndex + 1) % items.length)
            }
          >
            <FaArrowRight />
          </button>
        </div>

        <div className={styles.mobileIndicators}>
          {items.map((_, i) => (
            <button
              key={i}
              className={`${styles.indicator} ${
                i === index ? styles.indicatorActive : ''
              }`}
              onClick={() => goToService(i)}
              aria-label={`Go to service ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ServiceComponent;