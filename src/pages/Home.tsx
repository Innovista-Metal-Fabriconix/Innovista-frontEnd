import BlogSection from "../components/BlogSection";
import CustomerFeedback from "../components/CustomerFeedback";
import ImageSlider from "../components/ImageSlider";
import ServicesCarousel from "../components/ServiceCarousel";
import { usePageSEO } from "../utils/seo";

function Home() {
  usePageSEO(
    "Innovista Metal Fabriconix | Premium Aluminium & Steel Fabrication in Sri Lanka",
    "Innovista Metal Fabriconix offers premium aluminium doors, windows, partitions, shopfronts, facades, and steel fabrication services in Sri Lanka. Request a free quote today."
  );

  return (
    <main>
      <div
        style={{
          position: "relative",
          display: "flex",
          marginBottom: "50px",
          justifyContent: "center",
        }}
      >
        <ImageSlider />
      </div>
      <ServicesCarousel />
      {/* <FeaturedProducts /> */}
      <CustomerFeedback/>
      <BlogSection/>
    </main>
  );
}

export default Home;
