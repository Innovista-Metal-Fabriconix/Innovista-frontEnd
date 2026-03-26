import styles from "../cssModules/CustomerFeedback.module.css";
import SimpleScrollStack, { ScrollStackItem } from "./SimpleScrollStack";
import MainHeading from "./MainHeading";

function CustomerFeedback() {
  return (
    <div className={styles.container}>
      <MainHeading
        heading="What our Customer say"
        description="All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks."
      />
      <SimpleScrollStack>
        <ScrollStackItem>
          <div className={styles.card}>
            <div className={styles.avatar}>
              <img
                src="https://randomuser.me/api/portraits/men/32.jpg"
                alt="John Doe"
              />
            </div>
            <h3 className={styles.designation}>CEO of TechCorp</h3>
            <p className={styles.feedback}>
              "Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
              quae ab illo inventore veritatis et quasi architecto beatae vitae
              dicta sunt explicabo."
            </p>
          </div>
        </ScrollStackItem>
        <ScrollStackItem>
          <div className={styles.card}>
            <div className={styles.avatar}>
              <img
                src="https://randomuser.me/api/portraits/women/44.jpg"
                alt="Jane Smith"
              />
            </div>
            <h3 className={styles.designation}>Director of Operations</h3>
            <p className={styles.feedback}>
              "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit
              aut fugit, sed quia consequuntur magni dolores eos qui ratione
              voluptatem sequi nesciunt."
            </p>
          </div>
        </ScrollStackItem>
        <ScrollStackItem>
          <div className={styles.card}>
            <div className={styles.avatar}>
              <img
                src="https://randomuser.me/api/portraits/men/67.jpg"
                alt="Mike Johnson"
              />
            </div>
            <h3 className={styles.designation}>Founder of BuildRight</h3>
            <p className={styles.feedback}>
              "Ut enim ad minima veniam, quis nostrum exercitationem ullam
              corporis suscipit laboriosam, nisi ut aliquid ex ea commodi
              consequatur."
            </p>
          </div>
        </ScrollStackItem>
        <ScrollStackItem>
          <div className={styles.card}>
            <div className={styles.avatar}>
              <img
                src="https://randomuser.me/api/portraits/women/28.jpg"
                alt="Sarah Williams"
              />
            </div>
            <h3 className={styles.designation}>CEO of ABC Company</h3>
            <p className={styles.feedback}>
              "Quis autem vel eum iure reprehenderit qui in ea voluptate velit
              esse quam nihil molestiae consequatur, vel illum qui dolorem eum
              fugiat."
            </p>
          </div>
        </ScrollStackItem>
        <ScrollStackItem>
          <div className={styles.card}>
            <div className={styles.avatar}>
              <img
                src="https://randomuser.me/api/portraits/men/52.jpg"
                alt="David Brown"
              />
            </div>
            <h3 className={styles.designation}>CTO of InnovateTech</h3>
            <p className={styles.feedback}>
              "At vero eos et accusamus et iusto odio dignissimos ducimus qui
              blanditiis praesentium voluptatum deleniti atque corrupti quos
              dolores et quas molestias excepturi sint."
            </p>
          </div>
        </ScrollStackItem>
      </SimpleScrollStack>
    </div>
  );
}

export default CustomerFeedback;
