import React from "react";
import {
  Button,
  Card,
  Input,
  Form,
  Typography,
  Space,
  Divider,
  DatePicker,
  InputNumber,
  message,
} from "antd";
import SidebarOFADmin from "../../components/SidebarOFADmin";
import ViewallProjects from "./ViewallProjects";

const { Title } = Typography;
const { TextArea } = Input;

function AddProjects() {
  const [submitted, setSubmitted] = React.useState(false);

  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log("Form Values:", values);

    const projectData = {
      ...values,
      Project_Images: values.Project_Images
        ? values.Project_Images.split(",").map((url: string) => url.trim())
        : [],
    };

    console.log("Prepared Project Data:", projectData);

    setSubmitted(true);
    message.success("Project submitted successfully!");
    form.resetFields();
  };

  return (
    <>
      <SidebarOFADmin />
      <Card style={{ maxWidth: 700, margin: "20px auto", padding: 20 }}>
        <Title level={3}>Add New Project</Title>
        <Divider />

        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Project Title"
            name="Project_Title"
            rules={[
              { required: true, message: "Please enter the project title" },
            ]}
          >
            <Input placeholder="Enter project title" />
          </Form.Item>

          <Form.Item
            label="Project Description"
            name="Project_Description"
            rules={[
              { required: true, message: "Please enter project description" },
            ]}
          >
            <TextArea rows={4} placeholder="Enter project description" />
          </Form.Item>

          <Form.Item
            label="Project Images (comma separated URLs)"
            name="Project_Images"
          >
            <Input placeholder="Enter image URLs separated by commas" />
          </Form.Item>

          <Form.Item
            label="Location"
            name="Location"
            rules={[
              { required: true, message: "Please enter project location" },
            ]}
          >
            <Input placeholder="Enter project location" />
          </Form.Item>

          <Form.Item
            label="Client Name"
            name="Client_Name"
            rules={[{ required: true, message: "Please enter client name" }]}
          >
            <Input placeholder="Enter client name" />
          </Form.Item>

          <Form.Item
            label="Client Email"
            name="Client_Email"
            rules={[
              { required: true, message: "Please enter client email" },
              { type: "email", message: "Invalid email format" },
            ]}
          >
            <Input placeholder="Enter client email" />
          </Form.Item>

          <Form.Item label="Client Number" name="Client_Number">
            <Input placeholder="Enter client phone number" />
          </Form.Item>

          <Form.Item label="Client Company" name="Client_Company">
            <Input placeholder="Enter client company" />
          </Form.Item>

          <Form.Item label="Project Finished Date" name="Project_FinishedDate">
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            label="Budget"
            name="Budget"
            rules={[{ required: true, message: "Please enter project budget" }]}
          >
            <InputNumber
              placeholder="Enter budget"
              style={{ width: "100%" }}
              min={0}
              formatter={(value) => `$ ${value}`}
            />
          </Form.Item>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
              <Button htmlType="button" onClick={() => form.resetFields()}>
                Reset
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
      <ViewallProjects />
    </>
  );
}

export default AddProjects;
