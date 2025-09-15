import type { FormProps } from "antd";
import { Button, Checkbox, Form, Input, message, Flex, Col, Row } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import AdminLogo from "../assets/Images/AdminLogin.jpg";
import axios from "axios";


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

      console.log("Login Success:", response.data);
      message.success("Login successful!");

      sessionStorage.setItem("accessToken", response.data.tokens.accessToken);
      localStorage.setItem("refreshToken", response.data.tokens.refreshToken);

      window.location.href = "/admin-home";
    } catch (error: any) {
      console.error("Login Failed:", error.response?.data || error.message);
      message.error(error.response?.data?.message || "Login failed!");
    }
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Validation Failed:", errorInfo);
  };

  return (
    <>
      <div>
        <h1
          style={{
            textAlign: "center",
            marginBottom: "20px",
            marginTop: "20px",
          }}
        >
          Admin Login Page
        </h1>

        <Row
          gutter={[32, 32]}
          justify="center"
          align="middle"
          style={{ backgroundColor: "#f0f2f5", padding: "40px 20px" }}
        >
          <Col xs={24} md={12}>
            <img
              src={AdminLogo}
              alt="Admin Login"
              style={{ width: "70%", height: "auto" }}
            />
          </Col>
          <Col xs={24} md={12}>
            <Form
              name="login"
              initialValues={{ remember: true }}
              style={{ maxWidth: 360 }}
              onFinish={onFinish}
            >
              <Form.Item
                name="username"
                rules={[
                  { required: true, message: "Please input your Username!" },
                ]}
              >
                <Input prefix={<UserOutlined />} placeholder="Username" />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Please input your Password!" },
                ]}
              >
                <Input
                  prefix={<LockOutlined />}
                  type="password"
                  placeholder="Password"
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
                <Button block type="primary" htmlType="submit">
                  Log in
                </Button>
               
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default AdminLogin;
