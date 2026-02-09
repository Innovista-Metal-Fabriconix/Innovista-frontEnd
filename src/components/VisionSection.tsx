import styles from "../cssModules/VIsionSection.module.css";
import image1 from "../assets/Images/AboutUsPage/vision/vision1.jpg";
import image2 from "../assets/Images/AboutUsPage/vision/vision2.jpg";

function VisionSection() {
  return (
    <div className={styles.mainSection}>
      <div className={styles.imageContainer}>
        <div className={styles.leftImage}>
            <img src={image1} alt="image 1 about vision" />
        </div>
        <div className={styles.rightImage}>
            <img src={image2} alt="image 2 about vision" />
        </div>
      </div>
      <div className={styles.textContainer}>
        <h2>OUR VISION</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi,
          incidunt maiores totam praesentium tempore consequuntur nam quod
          cupiditate mollitia perspiciatis officiis est optio suscipit eveniet!
          Beatae laboriosam fugiat incidunt molestiae?
        </p>
      </div>
    </div>
  );
}

export default VisionSection;
