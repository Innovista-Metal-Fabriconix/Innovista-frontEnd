import type { FormProps } from "antd";
import {
  Button,
  Checkbox,
  Form,
  Input,
  message,
  Flex,
  Col,
  Row,
  Card,
  Modal,
} from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import AdminLogo from "../../assets/Images/logo/AdminLogin.jpg";
import axios from "axios";
import { useState } from "react";

type FieldType = {
  username?: string;
  password?: string;
  remember?: boolean;
};

function AdminLogin() {
  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    try {
      const response = await axios.post(
        `http://localhost:4000/auth/login?email=${values.username}&password=${values.password}`
      );

      message.success("Login successful!");

      sessionStorage.setItem("accessToken", response.data.tokens.accessToken);
      localStorage.setItem("refreshToken", response.data.tokens.refreshToken);

      window.location.href = "/admin-home";
    } catch (error: any) {
      
      alert(error.response?.data?.message);
    }
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Validation Failed:", errorInfo);
  };

  const [AdminEmail, setAdminEmail] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const HandleEmailSubmit = async () => {
    try {
      const response = await axios.post(
        `http://localhost:4000/auth/ResetPassword?email=${AdminEmail}`
      );

      console.log("Email submitted successfully", response);
      setIsModalOpen(true); // open dialog box
    } catch (error) {
      console.error("Error submitting email:", error);
      Modal.error({
        title: "Submission Failed",
        content: "Something went wrong. Please try again.",
      });
    }
  };
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #f3f4f9, #dfe9f3)",
        padding: "20px",
      }}
    >
      <Card
        style={{
          width: "100%",
          maxWidth: 900,
          borderRadius: "20px",
          padding: "30px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
          background: "rgba(255, 255, 255, 0.85)",
          backdropFilter: "blur(8px)",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            marginBottom: "30px",
            fontSize: "32px",
            fontWeight: "700",
          }}
        >
          Admin Login
        </h1>

        <Row gutter={[40, 40]} align="middle" justify="center">
          <Col xs={24} md={12} style={{ textAlign: "center" }}>
            <img
              src={AdminLogo}
              alt="Admin"
              style={{
                width: "80%",
                borderRadius: "15px",
                boxShadow: "0 5px 20px rgba(0,0,0,0.1)",
              }}
            />
          </Col>

          <Col xs={24} md={12}>
            <Card
              bordered={false}
              style={{
                padding: 20,
                borderRadius: "15px",
                background: "rgba(255,255,255,0.9)",
                boxShadow: "0 5px 15px rgba(0,0,0,0.07)",
              }}
            >
              <Form
                name="login"
                initialValues={{ remember: true }}
                style={{ width: "100%" }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
              >
                <Form.Item
                  name="username"
                  rules={[{ required: true, message: "Please enter Username" }]}
                >
                  <Input
                    prefix={<UserOutlined />}
                    placeholder="Enter admin email"
                    size="large"
                  />
                </Form.Item>

                <Form.Item
                  name="password"
                  rules={[{ required: true, message: "Please enter Password" }]}
                >
                  <Input.Password
                    prefix={<LockOutlined />}
                    placeholder="Enter password"
                    size="large"
                  />
                </Form.Item>

                <Form.Item>
                  <Flex justify="space-between" align="center">
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                      <Checkbox>Remember me</Checkbox>
                    </Form.Item>
                  </Flex>
                </Form.Item>

                <Form.Item>
                  <Button
                    block
                    type="primary"
                    htmlType="submit"
                    size="large"
                    style={{
                      borderRadius: "8px",
                      fontWeight: "600",
                    }}
                  >
                    Log In
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </Col>
          <div >
            <p
              style={{
                textAlign: "center",
                marginTop: "10px",
                color: "#1677ff",
                cursor: "pointer",
              }}
              onClick={() => setIsModalOpen(true)}
            >
              Forgot Password?
            </p>
            <Modal
              title="Reset Password"
              open={isModalOpen}
              onCancel={() => setIsModalOpen(false)}
              footer={null}
              style={{
                marginTop:"240px"
              }}
            >
              <p
                style={{
                  textAlign: "center",
                  marginTop: "10px",
                  fontSize: "14px",
                  color: "#888",
                }}
              >
                Enter Your Email
              </p>
              <Form onFinish={HandleEmailSubmit}>
                <label>Email</label>

                <Input
                  type="email"
                  placeholder="Enter your email"
                  onChange={(e) => setAdminEmail(e.target.value)}
                  required
                />

                <Button
                  htmlType="submit"
                  type="primary"
                  style={{ marginTop: "10px", width: "100%" }}
                >
                  Submit
                </Button>
              </Form>
            </Modal>
          </div>
        </Row>
      </Card>
    </div>
  );
}

export default AdminLogin;
