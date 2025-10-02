import styles from "../cssModules/ServiceComponet.module.css";
import { useEffect, useRef, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type Service = {
  image: string;
  title: string;
  description: string;
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
  const [displayItems, setDisplayItems] = useState<Service[]>([]);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
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
  }, [index]);

  useGSAP(() => {
    let mm = gsap.matchMedia();
    mm.add("(min-width: 769px)", () => {
      if (textRef.current) {
        gsap.fromTo(
          textRef.current,
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: textRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    });

    mm.add("(max-width: 768px)", () => {
      if (textRef.current) {
        gsap.fromTo(
          textRef.current,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: textRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    });

    return () => mm.revert();
  }, [displayItems]);

  useGSAP(() => {
    gsap.fromTo(
      imageRef.current,
      { x: -100, opacity: 0 },
      { x: 0, opacity: 1, duration: 1.5, ease: "power3.out",
        scrollTrigger: {
          trigger: imageRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
       }
      }
    );
  });

  return (
    <div className={styles.container}>
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
      <div className={styles.textContainer} ref={contentRef}>
        <div className={styles.textContent} ref={textRef}>
          <span className={styles.title}>{displayItems[0]?.title}</span>
          <p className={styles.description}>{displayItems[0]?.description}</p>
          <p className={styles.description}>{displayItems[0]?.description}</p>
        </div>
        <div className={styles.buttonContainer}>
          <button
            className={styles.prevButton}
            onClick={() =>
              setIndex(
                (prevIndex) => (prevIndex - 1 + items.length) % items.length
              )
            }
          >
            <FaArrowLeft />
          </button>
          <button
            className={styles.nextButton}
            onClick={() =>
              setIndex((prevIndex) => (prevIndex + 1) % items.length)
            }
          >
            <FaArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ServiceComponent;
