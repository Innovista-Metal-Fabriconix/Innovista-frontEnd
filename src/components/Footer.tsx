import { Row, Col, Typography, Button, Input, message as AntMessage } from "antd";
import { useState } from "react";
import emailjs from "@emailjs/browser";

import FB from "../assets/Logo/facebook.png";
import IG from "../assets/Logo/link.png";
import YT from "../assets/Logo/whatsapp.png";
import WP from "../assets/Logo/youtube.png";

const { TextArea } = Input;

function Footer() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const columns = [
    {
      title: "Product",
      items: ["Landing Page", "Popup Builder", "Web-design", "Content", "Integrations"],
    },
    {
      title: "Use Cases",
      items: ["Web-designers", "Marketers", "Small Business", "Website Builder"],
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


  const sendEmail = async () => {
    if (!email || !msg) {
      AntMessage.error("Please fill all fields");
      return;
    }

    setLoading(true);

    const templateParams = {
      name: email.split("@")[0],
      email: email,
      message: msg,
      title: "New Contact Message",
    };


    emailjs
      .send(
        "service_rjdnfs9", 
        "template_muej7l9",
        templateParams,
        "skqeYQiykHfTWqpQJ" 
      )
      .then(
        () => {
          AntMessage.success("Message sent successfully!");
          setEmail("");
          setMsg("");
          alert("Thank you for contacting us! We will get back to you soon.");
        },
        (error) => {
          console.error(error);
          AntMessage.error("Failed to send message. Try again!");
        }
      )
      .finally(() => setLoading(false));
  };

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
                <Typography.Title level={5} style={{ color: "white", marginBottom: "15px" }}>
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

        {/* CONTACT FORM */}
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
              style={{ color: "white", marginBottom: "20px", textAlign: "center" }}
            >
              Contact Us
            </Typography.Title>

            <Input
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              style={{
                marginBottom: "15px",
                borderRadius: "8px",
              }}
            />

            <Button
              type="primary"
              block
              loading={loading}
              onClick={sendEmail}
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

      {/* FOLLOW US */}
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
            onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.2)")}
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
    </div>
  );
}

export default Footer;
