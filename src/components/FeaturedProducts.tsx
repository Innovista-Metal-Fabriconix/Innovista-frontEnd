import React from "react";
import ProductCard from "./ProductCard";
import MainHeading from "./MainHeading";
import doorImage from "../assets/Images/Product/Door.jpg";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function FeaturedProducts() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const headingRef = React.useRef<HTMLDivElement>(null);
  const gridRef = React.useRef<HTMLDivElement>(null);
  const cardsRef = React.useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    if (!gridRef.current) return;

    const validCards = cardsRef.current.filter((card) => card !== null);

    if (validCards.length === 0) return;

    if (headingRef.current) {
      gsap.fromTo(
        headingRef.current,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 60%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    const sm = gsap.matchMedia();
    sm.add("(max-width: 768px)", () => {
      validCards.forEach((card, index) => {
        if (index % 2 === 0) {
          gsap.fromTo(
            card,
            {
              opacity: 0,
              x: 50,
              scale: 0.9,
            },
            {
              opacity: 1,
              x: 0,
              scale: 1,
              duration: 0.6,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: `top ${80 - index * 5}%`,
                onEnter: () =>
                  console.log(`Card ${index + 1} entered viewport`),
                toggleActions: "play none none reverse",
              },
            }
          );
        } else {
          gsap.fromTo(
            card,
            {
              opacity: 0,
              x: -50,
            },
            {
              opacity: 1,
              x: 0,
              duration: 0.6,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: `top ${80 - index * 5}%`,
                onEnter: () =>
                  console.log(`Card ${index + 1} entered viewport`),
                toggleActions: "play none none reverse",
              },
            }
          );
        }
      });
    });

    sm.add("(min-width: 769px)", () => {
      validCards.forEach((card, index) => {
        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: 80,
            scale: 0.9,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: `top ${80 - index * 5}%`,
              onEnter: () => console.log(`Card ${index + 1} entered viewport`),
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
      sm.revert();
    };
  }, []);

  const addCardRef = (el: HTMLDivElement | null, index: number) => {
    cardsRef.current[index] = el;
  };

  return (
    <div
      ref={containerRef}
      style={{
        marginTop: "100px",
        marginBottom: "100px",
      }}
    >
      <div ref={headingRef}>
        <MainHeading
          heading="Our Top Picks"
          description="All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks."
        />
      </div>

      <div
        ref={gridRef}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill,minmax(340px,1fr))",
          gap: "20px",
          marginTop: "50px",
          padding: "0 20px",
        }}
      >
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            ref={(el) => addCardRef(el, index)}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <ProductCard
              id={`product-${index}`}
              image={doorImage}
              title={"Alluminium Sliding Door"}
              description={
                "lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet"
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default FeaturedProducts;
