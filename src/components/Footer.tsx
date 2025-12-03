import { Row, Col, Typography, Button, Input } from "antd";
import FB from "../assets/Logo/facebook.png";
import IG from "../assets/Logo/link.png";
import YT from "../assets/Logo/whatsapp.png";
import WP from "../assets/Logo/youtube.png";

const { TextArea } = Input;

function Footer() {
  const columns = [
    {
      title: "Product",
      items: [
        "Landing Page",
        "Popup Builder",
        "Web-design",
        "Content",
        "Integrations",
      ],
    },
    {
      title: "Use Cases",
      items: [
        "Web-designers",
        "Marketers",
        "Small Business",
        "Website Builder",
      ],
    },
    {
      title: "Resources",
      items: ["Academy", "Blog", "Themes", "Hosting", "Developers", "Support"],
    },
    {
      title: "Company",
      items: ["About Us", "Careers", "FAQs", "Teams", "Contact Us"],
    },
  ];

  const socialIcons = [FB, IG, YT, WP];

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #f30f0f, #a50d0d)",
        padding: "50px 40px",
        color: "white",
      }}
    >
      <Row gutter={[32, 32]} justify="space-between" align="top">
        <Col xs={24} lg={14}>
          <Row gutter={[32, 32]}>
            {columns.map((col, idx) => (
              <Col xs={12} sm={12} md={6} key={idx}>
                <Typography.Title
                  level={5}
                  style={{ color: "white", marginBottom: "15px" }}
                >
                  {col.title}
                </Typography.Title>

                {col.items.map((item, i) => (
                  <Typography.Text
                    key={i}
                    style={{
                      display: "block",
                      color: "rgba(255,255,255,0.8)",
                      marginBottom: "8px",
                      fontSize: "15px",
                      cursor: "pointer",
                    }}
                  >
                    {item}
                  </Typography.Text>
                ))}
              </Col>
            ))}
          </Row>
        </Col>
        <Col xs={24} lg={10}>
          <div
            style={{
              background: "rgba(255,255,255,0.15)",
              padding: "28px",
              borderRadius: "16px",
              backdropFilter: "blur(6px)",
              boxShadow: "0 8px 25px rgba(0,0,0,0.3)",
              maxWidth: "430px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
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
              style={{
                marginBottom: "15px",
                height: "42px",
                borderRadius: "8px",
              }}
            />
            <TextArea
              rows={4}
              placeholder="Enter your message"
              maxLength={500}
              style={{
                marginBottom: "15px",
                borderRadius: "8px",
              }}
            />
            <Button
              type="primary"
              block
              style={{
                height: "42px",
                fontSize: "16px",
                borderRadius: "8px",
              }}
            >
              Submit
            </Button>
          </div>
        </Col>
      </Row>

      <div
        style={{
          width: "95%",
          height: "1px",
          backgroundColor: "rgba(255,255,255,0.3)",
          margin: "50px auto 30px",
        }}
      ></div>

      <Typography.Text
        style={{
          display: "block",
          textAlign: "center",
          marginBottom: "20px",
          fontSize: "17px",
          letterSpacing: "0.5px",
          fontWeight: "500",
        }}
      >
        Follow us
      </Typography.Text>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "22px",
          flexWrap: "wrap",
          marginBottom: "40px",
        }}
      >
        {socialIcons.map((icon, idx) => (
          <img
            key={idx}
            src={icon}
            alt="social-icon"
            style={{
              width: "40px",
              height: "40px",
              cursor: "pointer",
              transition: "transform 0.3s ease",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.transform = "scale(1.2)")
            }
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          />
        ))}
      </div>

      <Typography.Text
        style={{
          display: "block",
          textAlign: "center",
          marginBottom: "10px",
          fontSize: "15px",
        }}
      >
        Innovista © {new Date().getFullYear()} All Rights Reserved
      </Typography.Text>

      <div
        style={{
          width: "95%",
          height: "1px",
          backgroundColor: "rgba(255,255,255,0.3)",
          margin: "0 auto",
        }}
      ></div>
    </div>
  );
}

export default Footer;


//  service ID :- service_63w7zuo 