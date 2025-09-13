import { Col, Row, Typography, Button, Input } from "antd";
import FB from "../assets/Logo/facebook.png";
import IG from "../assets/Logo/link.png";
import LI from "../assets/Logo/gmail.png";
import TW from "../assets/Logo/phone.png";
import YT from "../assets/Logo/whatsapp.png";
import WP from "../assets/Logo/youtube.png";

const { TextArea } = Input;

function Footer() {
  return (
    <div style={{ backgroundColor: "#f30f0fff", padding: "20px 0" }}>
      <Row>
        <Col span={12} style={{ padding: "20px" }}>
          <Typography.Title
            level={4}
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
            style={{ marginBottom: "10px" }}
          />
          <TextArea
            rows={4}
            placeholder="Enter your message"
            maxLength={500}
            style={{ marginBottom: "10px" }}
          />
          <Button type="primary" block>
            Submit
          </Button>
        </Col>

        <Col span={12} style={{ padding: "20px", textAlign: "center" }}>
          <Typography.Title
            level={4}
            style={{ color: "white", marginBottom: "20px" }}
          >
            Get in Touch
          </Typography.Title>

          <div style={{ marginBottom: "50px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "15px",
                margin: "20px 0",
              }}
            >
              <img
                src={TW}
                alt="Phone"
                style={{ width: "30px", height: "30px", cursor: "pointer" }}
              />
              <Typography.Text style={{ color: "white", fontSize: "16px" }}>
                +1 (123) 456-7890
              </Typography.Text>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "15px",
                margin: "20px 0",
              }}
            >
              <img
                src={LI}
                alt="Gmail"
                style={{ width: "30px", height: "30px", cursor: "pointer" }}
              />
              <Typography.Text style={{ color: "white", fontSize: "16px" }}>
                example@gmail.com
              </Typography.Text>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "15px",
              marginBottom: "20px",
            }}
          >
            <img
              src={FB}
              alt="Facebook"
              style={{ width: "30px", height: "30px", cursor: "pointer" }}
            />
            <img
              src={IG}
              alt="Linkdin"
              style={{ width: "30px", height: "30px", cursor: "pointer" }}
            />
            <img
              src={YT}
              alt="Whatsapp"
              style={{ width: "30px", height: "30px", cursor: "pointer" }}
            />
            <img
              src={WP}
              alt="Gmail"
              style={{ width: "30px", height: "30px", cursor: "pointer" }}
            />
          </div>
        </Col>
      </Row>
      <Typography.Text
        style={{
          color: "white",
          textAlign: "center",
          display: "block",
          marginTop: "20px",
          fontSize: "16px",
        }}
      >
        Innovista © 2024 All Rights Reserved
      </Typography.Text>
    </div>
  );
}

export default Footer;
