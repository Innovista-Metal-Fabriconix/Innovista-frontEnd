import { useState, useRef, useEffect } from "react";
import CountUp from "react-countup";
import styles from "../cssModules/CountUpComp.module.css";

interface CountUpCompProps {
  number: number;
  title: string;
  duration?: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  delay?: number;
  enableScrollTrigger?: boolean;
  icon?: React.ReactNode;
  color?: "default" | "primary" | "secondary" | "accent";
  size?: "small" | "medium" | "large";
  animateOnHover?: boolean;
}

function CountUpComp({
  number,
  title,
  duration = 4,
  suffix = "+",
  prefix = "",
  decimals = 0,
  delay = 0,
  enableScrollTrigger = true,
  icon,
  color = "default",
  size = "medium",
  animateOnHover = true,
}: CountUpCompProps) {
  const [hasAnimated, setHasAnimated] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(!enableScrollTrigger);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const statItemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!enableScrollTrigger) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setTimeout(() => {
            setIsVisible(true);
            setHasAnimated(true);
          }, delay);
        }
      },
      {
        threshold: 0.3,
        rootMargin: "50px",
      }
    );

    if (statItemRef.current) {
      observer.observe(statItemRef.current);
    }

    return () => {
      if (statItemRef.current) {
        observer.unobserve(statItemRef.current);
      }
    };
  }, [enableScrollTrigger, hasAnimated, delay]);

  const handleMouseEnter = () => {
    if (animateOnHover) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    if (animateOnHover) {
      setIsHovered(false);
    }
  };

  const getStatItemClasses = () => {
    const classes = [styles.statItem];

    if (color !== "default") {
      classes.push(styles[`statItem--${color}`]);
    }

    if (size !== "medium") {
      classes.push(styles[`statItem--${size}`]);
    }

    if (isHovered && animateOnHover) {
      classes.push(styles["statItem--hovered"]);
    }

    if (isVisible) {
      classes.push(styles["statItem--visible"]);
    }

    return classes.join(" ");
  };

  return (
    <div
      ref={statItemRef}
      className={getStatItemClasses()}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role="region"
      aria-label={`Statistic: ${title}`}
    >
      {icon && <div className={styles.iconContainer}>{icon}</div>}

      <div className={styles.header}>
        <div className={styles.numberWrapper}>
          {prefix && <span className={styles.statItemPrefix}>{prefix}</span>}

          <CountUp
            start={0}
            end={isVisible ? number : 0}
            duration={duration}
            decimals={decimals}
            className={styles.statNumber}
            preserveValue={true}
            useEasing={true}
          />

          {suffix && <span className={styles.statItemSuffix}>{suffix}</span>}
        </div>
      </div>

      <p className={styles.statItemTitle}>{title}</p>

      <div className={styles.statItemFooter}>
        <div className={styles.footerLine}></div>
      </div>
    </div>
  );
}

export default CountUpComp;
