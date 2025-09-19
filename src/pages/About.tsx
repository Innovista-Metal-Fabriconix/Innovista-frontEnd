
import { Link } from "react-router-dom"
import Navbar from "../components/Navbar"
import ImageSlider from "../components/ImageSlider"
function About() {
  return (
    <div>
      <h1>About Page</h1>
      <Link to="/admin-login">Go to Admin Login</Link>
    </div>
  )
}

export default About