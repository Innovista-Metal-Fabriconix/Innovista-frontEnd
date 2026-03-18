import style from "../cssModules/AboutHead.module.css";
import image from "../assets/Images/AboutUsPage/aboutus.jpg";

export default function AboutHead() {
  return (
    <section className={style.aboutHead}>
      <div className={style.imageWrapper}>
        <img src={image} alt="About Us" />
      </div>
      <div className={style.contentWrapper}>
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
