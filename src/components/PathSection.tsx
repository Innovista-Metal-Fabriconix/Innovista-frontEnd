import { useNavigate } from "react-router-dom";
import MainHeading from "./MainHeading";
import styles from "../cssModules/PathSection.module.css";

function PathSection() {
  const navigate = useNavigate();

  return (
    <section className={styles.section}>
      <MainHeading
        heading="The Path We've Built"
        description="Lorem ipsum porta pellentesque sed vel fermentum ultrices facilisi sollicitudin urna pretium molestie auctor aliquet mi velit elit in convallis varius cras orci netus ut rhoncus mauris eu dui quam venenatis a odio semper ultrices mus odio neque senectus dolor. convallis varius cras orci netus ut rhoncus mauris eu dui quam venenatis a odio semper ultrices mus odio neque senectus dolor."
      />
      <div className={styles.buttonWrapper}>
        <button
          className={styles.findOutBtn}
          onClick={() => navigate("/milestones")}
        >
          Find out more
          <span className={styles.arrow}>&#x2197;</span>
        </button>
      </div>
    </section>
  );
}

export default PathSection;
