
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar" ;
import Home from "../pages/Home";
import Products from "../pages/Products";
import Blogs from "../pages/Blogs";
import Projects from "../pages/Projects";
import About from "../pages/About";
import Footer from "../components/Footer";

function PageRoute() {
  return (
       <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/projects" element={<Projects />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default PageRoute