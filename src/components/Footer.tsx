import { Col, Row, Typography, Button, Input } from "antd";
import FB from "../assets/Logo/facebook.png";
import IG from "../assets/Logo/link.png";
import LI from "../assets/Logo/gmail.png";
import TW from "../assets/Logo/phone.png";
import YT from "../assets/Logo/whatsapp.png";
import WP from "../assets/Logo/youtube.png";

const { TextArea } = Input;

function Footer() {
  const contactInfo = [
    { icon: TW, label: "+1 (123) 456-7890", alt: "Phone" },
    { icon: LI, label: "example@gmail.com", alt: "Gmail" },
  ];

  const socialIcons = [
    { src: FB, alt: "Facebook" },
    { src: IG, alt: "LinkedIn" },
    { src: YT, alt: "WhatsApp" },
    { src: WP, alt: "YouTube" },
  ];

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #f30f0f, #a50d0d)",
        padding: "20px 20px",
      }}
    >
      <Row gutter={[32, 32]} justify="center" align="middle">
        <Col xs={24} md={12}>
          <Typography.Title
            level={3}
            style={{
              color: "white",
              marginBottom: "20px",
              textAlign: "center",
            }}
          >
            Contact Us
          </Typography.Title>

          <Input
            placeholder="Enter your email"
            style={{ marginBottom: "12px" }}
          />
          <TextArea
            rows={4}
            placeholder="Enter your message"
            maxLength={500}
            style={{ marginBottom: "12px" }}
          />
          <Button type="primary" block>
            Submit
          </Button>
        </Col>

        <Col xs={24} md={12} style={{ textAlign: "center" }}>
          {" "}
          <Typography.Title
            level={3}
            style={{ color: "white", marginBottom: "20px" }}
          >
            {" "}
            Get in Touch{" "}
          </Typography.Title>{" "}
          <div style={{ marginBottom: "30px" , gap: "30px"}}>
            {" "}
            {contactInfo.map((item, idx) => (
              <div
                key={idx}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "10px 0",
                  gap: "20px",
                }}
              >
                {" "}
                <img
                  src={item.icon}
                  alt={item.alt}
                  style={{ width: "35px", height: "35px", cursor: "pointer" }}
                />{" "}
                <Typography.Text style={{ color: "white", fontSize: "16px" }}>
                  {" "}
                  {item.label}{" "}
                </Typography.Text>{" "}
              </div>
            ))}{" "}
          </div>{" "}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "20px",
              flexWrap: "wrap",
            }}
          >
            {" "}
            {socialIcons.map((icon, idx) => (
              <img
                key={idx}
                src={icon.src}
                alt={icon.alt}
                style={{
                  width: "50px",
                  height: "50px",
                  cursor: "pointer",
                  transition: "transform 0.3s ease",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.transform = "scale(1.1)")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              />
            ))}{" "}
          </div>{" "}
        </Col>
      </Row>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        <div
          style={{
            height: "1px",
            backgroundColor: "rgba(255, 255, 255, 0.3)",
            margin: "20px 0",
            width: "80%",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        ></div>
      </div>

      <Typography.Text
        style={{
          color: "white",
          textAlign: "center",
          display: "block",
          fontSize: "16px",
        }}
      >
        Innovista © {new Date().getFullYear()} All Rights Reserved
      </Typography.Text>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        <div
          style={{
            height: "1px",
            backgroundColor: "rgba(255, 255, 255, 0.3)",
            margin: "0 0 20px",
            width: "80%",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        ></div>
      </div>
    </div>
  );
}

export default Footer;
