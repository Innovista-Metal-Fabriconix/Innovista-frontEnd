import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar";
import Home from "../pages/Home";
import Products from "../pages/Products";
import Blogs from "../pages/Blogs";
import Projects from "../pages/Projects";
import About from "../pages/About";
import Footer from "../components/Footer";
import AdminLogin from "../pages/AdminLogin";
import AdminHome from "../pages/AdminHome";
import AdminRegister from "../pages/AdminRegisterForm";
import ManageAllAdmins from "../pages/ManageAllAdmins";

function PageRoute() {
  return (
    <Router>
      <div style={{ position: "relative", minHeight: "100vh" }}>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/products" element={<Products />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/admin-home" element={<AdminHome />} />
            <Route path="/admin-register" element={<AdminRegister />} />
            <Route path="/ManageAllAdmins" element={<ManageAllAdmins />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default PageRoute;
