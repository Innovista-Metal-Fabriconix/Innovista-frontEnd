import style from "../cssModules/AboutHead.module.css";
import image from "../assets/Images/AboutUsPage/aboutus.jpg";
import gsap from "gsap";
import { useEffect, useRef } from "react";

export default function AboutHead() {
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 481px)", () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        imageRef.current,
        { opacity: 0, y: -80 },
        { opacity: 1, y: 0, duration: 1 },
      ).fromTo(
        contentRef.current,
        { opacity: 0, y: -80 },
        { opacity: 1, y: 0, duration: 1 },
        "-=0.5",
      );

      return () => {
        tl.kill();
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <section className={style.aboutHead}>
      <div className={style.imageWrapper} ref={imageRef}>
        <img src={image} alt="About Us" />
      </div>
      <div className={style.contentWrapper} ref={contentRef}>
        <h2>
          <span className={style.openQuote}>"</span>
          SHAPING INNOVATION
          <br />
          <span className={style.line2}>BUILDING TRUST</span>
          <span className={style.closeQuote}>"</span>
        </h2>
        <p>
          AT INNOVISTA FABRICONIX, WE BELIEVE IN MORE THAN JUST ALUMINIUM AND
          FABRICATION WE BELIEVE IN CREATING LASTING VALUE. WITH A PASSION FOR
          CRAFTSMANSHIP, PRECISION ENGINEERING, AND MODERN DESIGN, WE DELIVER
          SOLUTIONS THAT NOT ONLY MEET YOUR NEEDS BUT ALSO ELEVATE YOUR
          LIFESTYLE AND BUSINESS
        </p>
      </div>
    </section>
  );
}
