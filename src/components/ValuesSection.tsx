import { useEffect, useRef } from "react";
import type { IconType } from "react-icons";
import {
  FaFaceSmile,
  FaUsers,
  FaHeart,
  FaLightbulb,
  FaLayerGroup,
} from "react-icons/fa6";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MainHeading from "./MainHeading";
import styles from "../cssModules/ValuesSection.module.css";

gsap.registerPlugin(ScrollTrigger);

type ValueItem = {
  title: string;
  description: string;
  Icon: IconType;
};

const values: ValueItem[] = [
  {
    title: "Lorem ipsum molestie porttitor",
    description:
      "Lorem ipsum lacus vestibulum ipsum mauris volutpat diam id volutpat lectus posuere aliquam cursus tellus.",
    Icon: FaFaceSmile,
  },
  {
    title: "Lorem ipsum molestie porttitor",
    description:
      "Lorem ipsum lacus vestibulum ipsum mauris volutpat diam id volutpat lectus posuere aliquam cursus tellus.",
    Icon: FaUsers,
  },
  {
    title: "Lorem ipsum molestie porttitor",
    description:
      "Lorem ipsum lacus vestibulum ipsum mauris volutpat diam id volutpat lectus posuere aliquam cursus tellus.",
    Icon: FaHeart,
  },
  {
    title: "Lorem ipsum molestie porttitor",
    description:
      "Lorem ipsum lacus vestibulum ipsum mauris volutpat diam id volutpat lectus posuere aliquam cursus tellus.",
    Icon: FaLightbulb,
  },
  {
    title: "Lorem ipsum molestie porttitor",
    description:
      "Lorem ipsum lacus vestibulum ipsum mauris volutpat diam id volutpat lectus posuere aliquam cursus tellus.",
    Icon: FaLayerGroup,
  },
];

function ValuesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<HTMLElement[]>([]);
  const iconRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 481px)", () => {
      const ctx = gsap.context(() => {
        const cards = cardRefs.current.filter(Boolean);
        const icons = iconRefs.current.filter(Boolean);

        if (!sectionRef.current || cards.length === 0) return;

        gsap.fromTo(
          cards,
          { y: 48, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.12,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 78%",
              once: true,
            },
          },
        );

        gsap.fromTo(
          icons,
          { scale: 0.65, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.65,
            ease: "back.out(1.7)",
            stagger: 0.1,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
              once: true,
            },
          },
        );
      }, sectionRef);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  return (
    <section className={styles.section} ref={sectionRef}>
      <MainHeading
        heading="The Values Behind Every Creation"
        description="Lorem ipsum porta pellentesque sed vel fermentum ultrices facilisi sollicitudin urna pretium molestie auctor aliquet mi velit elit in convallis varius cras orci netus ut rhoncus mauris eu dui quam venenatis a odio semper ultrices mus odio neque senectus dolor."
      />

      <div className={styles.cardsGrid}>
        {values.map(({ title, description, Icon }, index) => (
          <article
            className={styles.card}
            key={`${title}-${index}`}
            ref={(el) => {
              if (el) cardRefs.current[index] = el;
            }}
          >
            <div
              className={styles.iconCircle}
              aria-hidden="true"
              ref={(el) => {
                if (el) iconRefs.current[index] = el;
              }}
            >
              <Icon className={styles.icon} />
            </div>
            <h3 className={styles.cardTitle}>{title}</h3>
            <p className={styles.cardDescription}>{description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default ValuesSection;
