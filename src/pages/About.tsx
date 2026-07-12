import AboutHead from "../components/AboutHead";
import VisionSection from "../components/VisionSection";
import PathSection from "../components/PathSection";
import visionImg1 from "../assets/Images/AboutUsPage/vision/vision1.jpg";
import visionImg2 from "../assets/Images/AboutUsPage/vision/vision2.jpg";
import { usePageSEO } from "../utils/seo";

function About() {
  usePageSEO(
    "About Us | Innovista Metal Fabriconix Sri Lanka",
    "Discover the history, vision, and mission of Innovista Metal Fabriconix. We are Sri Lanka's trusted contractor for high-quality aluminium and steel fabrication since 2010."
  );

  return (
    <main>
      <AboutHead />
      <VisionSection
        title="OUR VISION"
        description="To be the premier partner in modern construction across Sri Lanka, recognized for transforming spaces through innovative, high-quality, and sustainable aluminium and steel fabrication solutions that stand the test of time."
        image1={visionImg1}
        image2={visionImg2}
        imagePosition="left"
      />
      <VisionSection
        title="OUR MISSION"
        description="To deliver exceptional craftsmanship and precision engineering in every project. We commit to understanding our clients' unique design needs, providing outstanding service, and building lasting relationships grounded in quality, safety, and mutual trust."
        image1={visionImg1}
        image2={visionImg2}
        imagePosition="right"
      />
      <PathSection />
    </main>
  );
}

export default About;
