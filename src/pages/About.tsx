import { Link } from "react-router-dom";
import AboutHead from "../components/AboutHead";

function About() {
  return (
    <div>
      <AboutHead/>
      <Link to="/admin-login">Go to Admin Login</Link>
    </div>
  );
}

export default About;
