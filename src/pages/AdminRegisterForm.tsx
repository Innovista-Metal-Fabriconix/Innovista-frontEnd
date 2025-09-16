import React from "react";
import { Button, Form, Input } from "antd";
import AxiosConfig from "../Context/AxiosConfig";

const App: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    const respond = AxiosConfig.post("/auth/register", {
      Admin_Name: values.Admin_Name,
      Admin_Email: values.Admin_Email,
      Admin_Phone: values.Admin_Phone,
      Admin_Profile: values.Admin_Profile,
    });
    console.log("Success:", respond);
    alert("Registration Successful");
    form.resetFields();
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      form={form}
      name="adminForm"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      style={{ maxWidth: 600 }}
      scrollToFirstError
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 16 }}
    >
      <Form.Item
        name="Admin_Name"
        label="Admin Name"
        rules={[{ required: true, message: "Please input Admin Name!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="Admin_Email"
        label="Admin Email"
        rules={[
          { type: "email", message: "Invalid email format!" },
          { required: true, message: "Please input Admin Email!" },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="Admin_Phone"
        label="Admin Phone"
        rules={[{ required: true, message: "Please input Admin Phone!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item name="Admin_Profile" label="Admin Profile (optional)">
        <Input.TextArea rows={4} placeholder="Enter profile details" />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default App;
