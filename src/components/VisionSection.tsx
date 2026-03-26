import { useEffect, useRef } from "react";
import styles from "../cssModules/VIsionSection.module.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type VisionSectionProps = {
  title: string;
  description: string;
  image1: string;
  image2: string;
  imagePosition?: "left" | "right";
};

function VisionSection({
  title,
  description,
  image1,
  image2,
  imagePosition = "left",
}: VisionSectionProps) {
  const isReversed = imagePosition === "right";
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, x: -150 },
        {
          opacity: 1,
          x: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        },
      );

      gsap.fromTo(
        textRef.current,
        { opacity: 0, x: 150 },
        {
          opacity: 1,
          x: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        },
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      className={`${styles.mainSection} ${isReversed ? styles.reversed : ""}`}
    >
      <div className={styles.imageContainer} ref={imageRef}>
        <div className={styles.leftImage}>
          <img src={image1} alt={`${title} image 1`} />
        </div>
        <div className={styles.rightImage}>
          <img src={image2} alt={`${title} image 2`} />
        </div>
      </div>
      <div className={styles.textContainer} ref={textRef}>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default VisionSection;
