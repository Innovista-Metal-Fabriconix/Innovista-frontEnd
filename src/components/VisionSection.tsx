import styles from "../cssModules/VIsionSection.module.css";

type VisionSectionProps = {
  title: string;
  description: string;
  image1: string;
  image2: string;
  imagePosition?: "left" | "right";
};

function VisionSection({
  title,
  description,
  image1,
  image2,
  imagePosition = "left",
}: VisionSectionProps) {
  const isReversed = imagePosition === "right";

  return (
    <div
      className={`${styles.mainSection} ${isReversed ? styles.reversed : ""}`}
    >
      <div className={styles.imageContainer}>
        <div className={styles.leftImage}>
          <img src={image1} alt={`${title} image 1`} />
        </div>
        <div className={styles.rightImage}>
          <img src={image2} alt={`${title} image 2`} />
        </div>
      </div>
      <div className={styles.textContainer}>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default VisionSection;
