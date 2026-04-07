import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar";
import Home from "../pages/Home";
import Products from "../pages/Products";
import Blogs from "../pages/Blogs";
import Projects from "../pages/Projects";
import About from "../pages/About";
import Footer from "../components/Footer";
import AdminLogin from "../pages/Adminpages/AdminLogin";
import AdminHome from "../pages/Adminpages/AdminHome";
import AdminRegister from "../pages/AdminRegisterForm";
import ManageAllAdmins from "../pages/Adminpages/ManageAllAdmins";
import DesignAdded from "../pages/DesignAdded";
import ViewAllDesigns from "../pages/ViewAllDesigns";
import CustomerManager from "../pages/CustomerManager";
import CustomerVerify from "../pages/CustomerVerify";
import OrdermanageAdmin from "../pages/Adminpages/OrdermanageAdmin";
import AdminFeedback from "../pages/Adminpages/AdminFeedback";
import Notification from "../pages/Adminpages/Notification";
import ProductDetails from "../pages/ProductDetails";
import TargetCursor from "../components/cursor/TragetCursor";
import AddProjects from "../pages/Adminpages/AddProjects";
import DesignViwe from "../pages/DesignViwe";
import OrderCart from "../pages/OrderCart";
import Milestones from "../pages/Milestones";
import ScrollToTop from "../components/ScrollToTop";
import RequestQuotePage from "../pages/RequestQuotePage";

function PageRoute() {
  return (
    <Router>
      <ScrollToTop />
      <div style={{ position: "relative", minHeight: "100vh" }}>
        <TargetCursor spinDuration={2} hideDefaultCursor={true} />
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
            <Route path="/DesignAdded" element={<DesignAdded />} />
            <Route path="/ViewAllDesigns" element={<ViewAllDesigns />} />
            <Route path="/CustomerManager" element={<CustomerManager />} />
            <Route path="/CustomerVerify" element={<CustomerVerify />} />
            <Route path="/OrdermanageAdmin" element={<OrdermanageAdmin />} />
            <Route path="/AdminFeedback" element={<AdminFeedback />} />
            <Route path="/Notification" element={<Notification />} />
            <Route path="/product-details" element={<ProductDetails />} />
            <Route path="/AddProjects" element={<AddProjects />} />
            <Route path="/DesignViwe" element={<DesignViwe />} />
            <Route path="/OrderCart" element={<OrderCart />} />
            <Route path="/milestones" element={<Milestones />} />
            <Route path="/request-quote" element={<RequestQuotePage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default PageRoute;
