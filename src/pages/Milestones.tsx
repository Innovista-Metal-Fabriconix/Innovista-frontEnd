import { useEffect, useRef } from "react";
import styles from "../cssModules/Milestones.module.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MainHeading from "../components/MainHeading";
import image2019 from "../assets/Journey/2019.png";
import image2022 from "../assets/Journey/2022.png";
import image2025 from "../assets/Journey/2025.png";
import image2010 from "../assets/Journey/2010.jpg"
import { usePageSEO } from "../utils/seo";

gsap.registerPlugin(ScrollTrigger);

type Milestone = {
  year: string;
  description: string;
  image: string;
};

const milestones: Milestone[] = [
  {
    year: "2010",
    description:
      "Aluminium fabricator Nishantha Anura Senrathna started the business as his own and do business ",
    image:
      image2010,
  },
  {
    year: "2019",
    description:
      "Registered the business as a sole proprietorship 2019 named ‘NISHANTHA PARTITION’",
    image:
      image2019,
  },
  {
    year: "2022",
    description: "We changed the the business name as ‘NP Contractors’",
    image:
      image2022,
  },
  {
    year: "2025",
    description:
      "Newly business start as a Private Limited Company, named as Innovista Metal fabriconix (PVT) Ltd",
    image:
      image2025,
  },
];

function Milestones() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  usePageSEO(
    "Our Milestones | Innovista Metal Fabriconix Sri Lanka",
    "Follow our history and key milestones since 2010. See how we transitioned from Nishantha Partition to Innovista Metal Fabriconix (PVT) Ltd."
  );

  useEffect(() => {
    const ctx = gsap.context(() => {
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

      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        const isLeft = index % 2 === 0;

        gsap.fromTo(
          card,
          {
            opacity: 0,
            x: isLeft ? -150 : 150,
            y: 40,
            scale: 0.85,
            rotateY: isLeft ? -8 : 8,
          },
          {
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
            rotateY: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
              end: "top 60%",
              toggleActions: "play none none none",
            },
          },
        );

        const dot = card.querySelector(`.${styles.dot}`);
        if (dot) {
          gsap.fromTo(
            dot,
            { scale: 0, rotate: -180 },
            {
              scale: 1,
              rotate: 0,
              duration: 0.6,
              ease: "back.out(3)",
              delay: 0.3,
              scrollTrigger: {
                trigger: card,
                start: "top 88%",
              },
            },
          );
        }

        const content = card.querySelector(`.${styles.card}`);
        if (content) {
          gsap.fromTo(
            content,
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: "power2.out",
              delay: 0.2,
              scrollTrigger: {
                trigger: card,
                start: "top 88%",
              },
            },
          );
        }
      });
    }, timelineRef);

    return () => ctx.revert();
  }, []);

  return (
    <main className={styles.page}>
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
                <img src={milestone.image} alt={`Innovista Metal Fabriconix milestone in ${milestone.year}`} />
              </div>
              <div className={styles.cardContent}>
                <p>{milestone.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default Milestones;
