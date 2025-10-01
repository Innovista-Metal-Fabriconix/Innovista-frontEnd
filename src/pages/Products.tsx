import { Link } from "react-router-dom";
import Productpage from "../assets/Images/Productpage.jpg";
import { Typography, Card, Row, Col } from "antd";
import { motion } from "framer-motion";

import DoorsImg from "../assets/Images/Productpage.jpg";
import WindowsImg from "../assets/Images/Productpage.jpg";
import PartitionImg from "../assets/Images/Productpage.jpg";
import ShopFrontImg from "../assets/Images/Productpage.jpg";
import LouversImg from "../assets/Images/Productpage.jpg";
import BathroomsImg from "../assets/Images/Productpage.jpg";
import RoofImg from "../assets/Images/Productpage.jpg";
import TileImg from "../assets/Images/Productpage.jpg";
import LaddersImg from "../assets/Images/Productpage.jpg";
import RacksImg from "../assets/Images/Productpage.jpg";
import WardrobeImg from "../assets/Images/Productpage.jpg";
import PantryImg from "../assets/Images/Productpage.jpg";
import SteelImage from "../assets/Images/Productpage.jpg";


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
  return (
    <div style={{ width: "100%", overflow: "hidden" }}>
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
            level={2}
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
          <u style={{ textDecorationColor: "#4d97ff", paddingBottom: "4px" }}>
            Product Categories
          </u>
        </Typography.Text>
      </div>

      <div style={{ padding: "40px 60px", backgroundColor: "#fff" }}>
        <Row gutter={[24, 24]} justify="center">
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
                      style={{
                        height: "150px",
                        objectFit: "cover",
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
                >
                  <Typography.Text strong style={{ fontSize: "16px" }}>
                    {cat.name}
                  </Typography.Text>
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <Link to="/categories">
            <Typography.Link style={{ fontSize: "18px" }}>
              View more +
            </Typography.Link>
          </Link>
        </div>
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
              We use premium materials and strict quality checks to ensure every
              product lasts for years.
            </Typography.Paragraph>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Typography.Title level={4}>Modern & Elegant Designs</Typography.Title>
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
            <Typography.Title level={4}>Trusted Partnerships</Typography.Title>
            <Typography.Paragraph>
              Our team has an in-depth understanding of the industry and strong
              collaborations worldwide.
            </Typography.Paragraph>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Typography.Title level={4}>Customer-Centered Service</Typography.Title>
            <Typography.Paragraph>
              We are proud members of leading associations and have received
              accolades for our outstanding service.
            </Typography.Paragraph>
          </motion.div>
        </Col>
      </Row>
    </div>
    </div>
  );
}

export default Products;
