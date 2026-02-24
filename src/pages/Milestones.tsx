import { useEffect, useRef } from "react";
import styles from "../cssModules/Milestones.module.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MainHeading from "../components/MainHeading";

gsap.registerPlugin(ScrollTrigger);

type Milestone = {
  year: string;
  title: string;
  description: string;
  image: string;
};

const milestones: Milestone[] = [
  {
    year: "2015",
    title: "The Beginning",
    description:
      "Innovista Fabriconix was founded with a vision to revolutionize aluminium fabrication. Starting from a small workshop, we began our journey towards excellence.",
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=300&fit=crop",
  },
  {
    year: "2017",
    title: "First Major Project",
    description:
      "Completed our first large-scale commercial project, establishing our reputation for quality craftsmanship and precision engineering in the industry.",
    image:
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop",
  },
  {
    year: "2019",
    title: "Expanding Horizons",
    description:
      "Expanded our operations with state-of-the-art machinery and a larger facility, enabling us to take on more ambitious projects across the region.",
    image:
      "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=400&h=300&fit=crop",
  },
  {
    year: "2021",
    title: "Innovation & Technology",
    description:
      "Integrated modern design tools and advanced fabrication technology, pushing the boundaries of what's possible in aluminium construction.",
    image:
      "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=300&fit=crop",
  },
  {
    year: "2023",
    title: "Industry Recognition",
    description:
      "Received industry awards for excellence in fabrication and design. Our commitment to quality earned us partnerships with leading construction firms.",
    image:
      "https://images.unsplash.com/photo-1531834685032-c34bf0d84c77?w=400&h=300&fit=crop",
  },
  {
    year: "2025",
    title: "Building the Future",
    description:
      "Continuing to shape innovation and build trust. With a growing team and expanding capabilities, we are ready to take on the challenges of tomorrow.",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop",
  },
];

function Milestones() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the center line growing
      const line = timelineRef.current?.querySelector(`.${styles.centerLine}`);
      if (line) {
        gsap.fromTo(
          line,
          { scaleY: 0 },
          {
            scaleY: 1,
            duration: 1.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: timelineRef.current,
              start: "top 80%",
            },
          },
        );
      }

      // Animate each card
      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        const isLeft = index % 2 === 0;

        gsap.fromTo(
          card,
          {
            opacity: 0,
            x: isLeft ? -120 : 120,
            scale: 0.9,
          },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          },
        );

        // Animate the dot
        const dot = card.querySelector(`.${styles.dot}`);
        if (dot) {
          gsap.fromTo(
            dot,
            { scale: 0 },
            {
              scale: 1,
              duration: 0.4,
              ease: "back.out(3)",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
              },
            },
          );
        }
      });
    }, timelineRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className={styles.page}>
      <MainHeading
        heading="Our Milestones"
        description="A journey of growth, innovation, and excellence that defines who we are today."
      />

      <div className={styles.timeline} ref={timelineRef}>
        <div className={styles.centerLine}></div>

        {milestones.map((milestone, index) => (
          <div
            key={index}
            className={`${styles.timelineItem} ${
              index % 2 === 0 ? styles.left : styles.right
            }`}
            ref={(el) => {
              cardsRef.current[index] = el;
            }}
          >
            <div className={styles.dot}>
              <span className={styles.year}>{milestone.year}</span>
            </div>
            <div className={styles.card}>
              <div className={styles.cardImage}>
                <img src={milestone.image} alt={milestone.title} />
              </div>
              <div className={styles.cardContent}>
                <h3>{milestone.title}</h3>
                <p>{milestone.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Milestones;
