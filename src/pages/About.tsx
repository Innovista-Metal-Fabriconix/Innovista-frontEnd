import AboutHead from "../components/AboutHead";
import VisionSection from "../components/VisionSection";
import PathSection from "../components/PathSection";
import visionImg1 from "../assets/Images/AboutUsPage/vision/vision1.jpg";
import visionImg2 from "../assets/Images/AboutUsPage/vision/vision2.jpg";

function About() {
  return (
    <div>
      <AboutHead />
      <VisionSection
        title="OUR VISION"
        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi, incidunt maiores totam praesentium tempore consequuntur nam quod cupiditate mollitia perspiciatis officiis est optio suscipit eveniet! Beatae laboriosam fugiat incidunt molestiae?"
        image1={visionImg1}
        image2={visionImg2}
        imagePosition="left"
      />
      <VisionSection
        title="OUR MISSION"
        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi, incidunt maiores totam praesentium tempore consequuntur nam quod cupiditate mollitia perspiciatis officiis est optio suscipit eveniet! Beatae laboriosam fugiat incidunt molestiae?"
        image1={visionImg1}
        image2={visionImg2}
        imagePosition="right"
      />
      <PathSection />
    </div>
  );
}

export default About;
