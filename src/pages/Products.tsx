
import Productpage from "../assets/Images/Productpage.jpg";
import { Typography, Card, Row, Col, Button } from "antd";
import { motion } from "framer-motion";

import DoorsImg from "../assets/Images/Products/alluminiumdoors.png";
import WindowsImg from "../assets/Images/Products/windows.png";
import PartitionImg from "../assets/Images/Products/partition.png";
import ShopFrontImg from "../assets/Images/Products/shopfront.png";
import LouversImg from "../assets/Images/Products/louvers.png";
import BathroomsImg from "../assets/Images/Products/bathrooms.png";
import RoofImg from "../assets/Images/Products/roofing.png";
import TileImg from "../assets/Images/Products/tileskirting.png";
import LaddersImg from "../assets/Images/Products/ladders.png";
import RacksImg from "../assets/Images/Products/racks.png";
import WardrobeImg from "../assets/Images/Products/wardrobe.png";
import PantryImg from "../assets/Images/Products/pantry.png";
import SteelImage from "../assets/Images/Products/steelimage.png";


import { useNavigate } from "react-router-dom";
import MainHeading from "../components/MainHeading";
import { usePageSEO } from "../utils/seo";

const categories = [
  { name: "Doors", img: DoorsImg },
  { name: "Windows", img: WindowsImg },
  { name: "Partition", img: PartitionImg },
  { name: "Shop Front", img: ShopFrontImg },
  { name: "Louvers", img: LouversImg },
  { name: "Bathrooms", img: BathroomsImg },
  { name: "Roof", img: RoofImg },
  { name: "Tile Skirting", img: TileImg },
  { name: "Ladders", img: LaddersImg },
  { name: "Racks", img: RacksImg },
  { name: "Wardrobe", img: WardrobeImg },
  { name: "Pantry Cupboard", img: PantryImg },
];

function Products() {
  const navigate = useNavigate();
  const handleNavigate = (categoryName: string) => {
    navigate(`/DesignViwe?category=${encodeURIComponent(categoryName)}`);
  };

  usePageSEO(
    "Products | Aluminium Doors, Windows, Partitions & Fabrication — Innovista Metal Fabriconix",
    "Explore the high-quality product categories offered by Innovista Metal Fabriconix in Sri Lanka, including premium aluminium doors, windows, office partitions, shopfronts, and roofing."
  );

  return (
    <main style={{ width: "100%", overflow: "hidden" }}>
      <motion.div
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        style={{
          position: "relative",
          height: "70vh",
          width: "100%",
          backgroundImage: `url(${Productpage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 5%",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to right, rgba(0,0,0,0.7), rgba(0,0,0,0.2))",
          }}
        ></div>

        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          style={{
            position: "relative",
            zIndex: 2,
            maxWidth: "700px",
          }}
        >
          <Typography.Title
            level={1}
            style={{
              color: "white",
              fontFamily: "revert-layer",
              fontSize: "clamp(2rem, 5vw, 3rem)",
              marginBottom: "10px",
            }}
          >
            <b>Discover Endless Choices</b>
          </Typography.Title>

          <Typography.Title
            level={4}
            style={{
              color: "white",
              fontFamily: "revert-layer",
              fontSize: "clamp(1.2rem, 3vw, 1.6rem)",
              marginBottom: "20px",
            }}
          >
            <b>Across Every Category</b>
          </Typography.Title>

          <Typography.Paragraph
            style={{
              color: "white",
              fontFamily: "revert-layer",
              fontSize: "clamp(1rem, 2.5vw, 1.2rem)",
              lineHeight: "1.8",
              marginBottom: "30px",
            }}
          >
            From elegant doors and windows to modern bathroom fittings and
            partitions, discover everything you need under one roof crafted for
            durability, style, and quality.
          </Typography.Paragraph>
        </motion.div>
      </motion.div>

      <div
        style={{
          textAlign: "center",
          padding: "40px 20px 20px 20px",
          backgroundColor: "#f0f0f0",
        }}
      >
        <Typography.Text
          style={{
            fontSize: "28px",
            fontWeight: 600,
            background:
              "linear-gradient(90deg, #ff4d4f, #ffa940, #52c41a, #1890ff, #722ed1)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            display: "inline-block",
          }}
        >
          <MainHeading heading="product categories" description="" />
        </Typography.Text>
      </div>

      <div
        className="px-4 py-8 sm:px-8 md:px-12 lg:px-16"
        style={{ backgroundColor: "#fff" }}
      >
        <Row gutter={[{ xs: 12, sm: 16, md: 24 }, { xs: 12, sm: 16, md: 24 }]} justify="center">
          {categories.map((cat, idx) => (
            <Col xs={12} sm={8} md={6} lg={4} key={idx}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <Card
                  hoverable
                  cover={
                    <img
                      alt={cat.name}
                      src={cat.img}
                      loading="lazy"
                      className="h-32 sm:h-36 md:h-40 w-full object-cover"
                      style={{
                        borderTopLeftRadius: "10px",
                        borderTopRightRadius: "10px",
                      }}
                    />
                  }
                  style={{
                    borderRadius: "12px",
                    overflow: "hidden",
                    textAlign: "center",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  }}
                  styles={{
                    body: {
                      padding: "16px 12px",
                    }
                  }}
                >
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <Typography.Text strong style={{ fontSize: "clamp(13px, 3.5vw, 16px)", minHeight: "44px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      {cat.name}
                    </Typography.Text>
                    <Button
                      block
                      style={{
                        marginTop: "8px",
                      }}
                      onClick={() => handleNavigate(cat.name)}
                    >
                      View Details
                    </Button>
                  </div>
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>
        <div style={{ textAlign: "center", marginTop: "20px" }}></div>
      </div>
      <div>
        <Row
          gutter={[32, 32]}
          style={{
            background: "linear-gradient(135deg, #f8f9fa, #eef3f8)",
            borderRadius: "20px",
            margin: "60px 0",
            boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
            overflow: "hidden",
          }}
        >
          <Col xs={24} md={8} style={{ padding: "40px 30px" }}>
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <Typography.Text
                style={{
                  fontSize: "clamp(2rem, 5vw, 3rem)",
                  fontWeight: 700,
                  lineHeight: 1.2,
                  color: "#b1a7a7ff",
                  display: "inline-block",
                }}
              >
                Why Choose Our Products
              </Typography.Text>
            </motion.div>
          </Col>

          <Col xs={24} md={16} style={{ padding: "40px 30px" }}>
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <Typography.Paragraph
                style={{
                  fontSize: "18px",
                  fontWeight: 500,
                  lineHeight: "1.9",
                  color: "#333",
                  maxWidth: "700px",
                  margin: "0 auto",
                  textAlign: "justify",
                }}
              >
                We provide the best services with a guarantee. As trusted
                leaders in the industry, we always bring the finest options to
                our customers and clients. Quality and reliability are at the
                heart of what we do, and we never compromise on excellence. Our
                products are built to last, designed for performance, and backed
                by a promise of trust.
              </Typography.Paragraph>
            </motion.div>
          </Col>
        </Row>
      </div>
      <div
        style={{
          padding: "80px 40px",
          background: "#fff",
          position: "relative",
        }}
      >
        <Row gutter={[32, 32]} align="middle" justify="center">
          <Col xs={24} md={8} style={{ textAlign: "left" }}>
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              style={{ marginBottom: "60px" }}
            >
              <Typography.Title level={4}>Unmatched Quality</Typography.Title>
              <Typography.Paragraph>
                We use premium materials and strict quality checks to ensure
                every product lasts for years.
              </Typography.Paragraph>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Typography.Title level={4}>
                Modern & Elegant Designs
              </Typography.Title>
              <Typography.Paragraph>
                We provide customized solutions to meet your unique property
                requirements.
              </Typography.Paragraph>
            </motion.div>
          </Col>
          <Col xs={24} md={8} style={{ textAlign: "left" }}>
            <motion.img
              src={SteelImage}
              alt="Why Choose Us"
              loading="lazy"
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1 }}
              style={{
                width: "100%",
                maxWidth: "420px",
                borderRadius: "0 0 50% 50%",
                objectFit: "cover",
                boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
              }}
            />
          </Col>

          <Col xs={24} md={8} style={{ textAlign: "left" }}>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              style={{ marginBottom: "60px" }}
            >
              <Typography.Title level={4}>
                Trusted Partnerships
              </Typography.Title>
              <Typography.Paragraph>
                Our team has an in-depth understanding of the industry and
                strong collaborations worldwide.
              </Typography.Paragraph>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Typography.Title level={4}>
                Customer-Centered Service
              </Typography.Title>
              <Typography.Paragraph>
                We are proud members of leading associations and have received
                accolades for our outstanding service.
              </Typography.Paragraph>
            </motion.div>
          </Col>
        </Row>
      </div>
    </main>
  );
}

export default Products;
