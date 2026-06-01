import { useEffect, useState } from "react";
import styles from "../cssModules/CustomerFeedback.module.css";
import SimpleScrollStack, { ScrollStackItem } from "./SimpleScrollStack";
import MainHeading from "./MainHeading";
import HeshanImage from "../assets/Testimonials/Heshan.png";
import KumaraImage from "../assets/Testimonials/Kumara.png";
import RushilImage from "../assets/Testimonials/Rushil.png";
import SisiraImage from "../assets/Testimonials/Sisira.png";

type CustomerFeedbackEntry = {
  name: string;
  designation: string;
  imageKey: string;
  feedback: string;
};

const imageMap: Record<string, string> = {
  Heshan: HeshanImage,
  Kumara: KumaraImage,
  Rushil: RushilImage,
  Sisira: SisiraImage,
};

function CustomerFeedback() {
  const [feedbackItems, setFeedbackItems] = useState<CustomerFeedbackEntry[]>(
    [],
  );

  useEffect(() => {
    let isMounted = true;

    const loadFeedback = async () => {
      try {
        const feedbackUrl = new URL(
          "../assets/Testimonials/customer-feedback.json",
          import.meta.url,
        );
        const response = await fetch(feedbackUrl);
        if (!response.ok) {
          throw new Error("Failed to load customer feedback");
        }

        const data = (await response.json()) as CustomerFeedbackEntry[];

        if (isMounted) {
          setFeedbackItems(data);
        }
      } catch {
        if (isMounted) {
          setFeedbackItems([]);
        }
      }
    };

    void loadFeedback();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className={styles.container}>
      <MainHeading
        heading="What our Customer say"
      />
      <SimpleScrollStack>
        {feedbackItems.map((item) => (
          <ScrollStackItem key={item.name}>
            <div className={styles.card}>
              <div className={styles.avatar}>
                <img src={imageMap[item.imageKey]} alt={item.name} />
              </div>
              <h3 className={styles.designation}>{item.designation}</h3>
              <p className={styles.feedback}>"{item.feedback}"</p>
            </div>
          </ScrollStackItem>
        ))}
      </SimpleScrollStack>
    </div>
  );
}

export default CustomerFeedback;
