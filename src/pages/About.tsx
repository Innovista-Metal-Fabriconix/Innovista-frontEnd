import { Link } from "react-router-dom";
import AboutHead from "../components/AboutHead";
import VisionSection from "../components/VisionSection";

function About() {
  return (
    <div>
      <AboutHead/>
      <VisionSection/>
      <Link to="/admin-login">Go to Admin Login</Link>
    </div>
  );
}

export default About;
