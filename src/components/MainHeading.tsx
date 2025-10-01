  import { useEffect, useRef } from "react";
import styles from "../cssModules/MainHeading.module.css";
import { gsap } from "gsap";

function MainHeading({ heading }: { heading: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    gsap.fromTo(
      containerRef.current,
      {
        y: -30,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1.5,
        ease: "power3.out",
      }
    );
  }, []);
  return (
    <div className={styles.container} ref={containerRef}>
      <span className={styles.heading}>{heading}</span>
    </div>
  );
}

export default MainHeading;
