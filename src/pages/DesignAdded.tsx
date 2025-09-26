import React, { useState } from "react";
import { Button, Card, Input, Form, Typography, Space, Divider } from "antd";
import AxiosConfig from "../Context/AxiosConfig";
import SidebarOFADmin from "../components/SidebarOFADmin";

const { Title } = Typography;
const { TextArea } = Input;

export default function DesignForm() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    DesignID: 1,
    Design_Name: "",
    Design_Image: [],
    Design_Description: "",
    Categories: [],
    Design_Colors: [],
    Design_BlogPosts: [],
    Design_Sizes: [],
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: string,
    index?: number
  ) => {
    if (index !== undefined) {
      const copy = [...(formData as any)[field]];
      copy[index] = e.target.value;
      setFormData({ ...formData, [field]: copy });
    } else {
      setFormData({ ...formData, [field]: e.target.value });
    }
  };

  const addArrayField = (field: string) => {
    setFormData({ ...formData, [field]: [...(formData as any)[field], ""] });
  };

  const handleSubmit = async () => {
    console.log("Submitted:", formData);

    try {
      const response = await AxiosConfig.post("/designs/create", {
        ...formData,
      });
      console.log("Design submitted successfully:", response.data);
      setFormData({
        DesignID: 1,
        Design_Name: "",
        Design_Image: [],
        Design_Description: "",
        Categories: [],
        Design_Colors: [],
        Design_BlogPosts: [],
        Design_Sizes: [],
      });
      alert("Design submitted successfully!");
    } catch (error: any) {
      if (error.response) {
        console.error("Backend validation error:", error.response.data);
        alert(`Error: ${JSON.stringify(error.response.data)}`);
      } else {
        console.error("Unexpected error:", error);
      }
    }
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <Card style={{ maxWidth: 600, margin: "40px auto", textAlign: "center" }}>
        <Title level={3} style={{ color: "green" }}>
          Design Added Successfully 🎉
        </Title>
        <Button type="primary" onClick={() => setSubmitted(false)}>
          Add Another Design
        </Button>
      </Card>
    );
  }

  return (
    <>
      <SidebarOFADmin />
      <Card style={{ maxWidth: 600, margin: "40px auto" }}>
        <Title level={3} style={{ textAlign: "center" }}>
          Add New Design
        </Title>
        <Divider />
        <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item label="Design Name" required>
            <Input
              value={formData.Design_Name}
              onChange={(e) => handleChange(e, "Design_Name")}
            />
          </Form.Item>

          <Form.Item label="Design Description" required>
            <TextArea
              rows={4}
              value={formData.Design_Description}
              onChange={(e) => handleChange(e, "Design_Description")}
            />
          </Form.Item>

          {[
            "Design_Image",
            "Categories",
            "Design_Colors",
            "Design_BlogPosts",
            "Design_Sizes",
          ].map((field) => (
            <Form.Item key={field} label={field.replace(/_/g, " ")}>
              <Space direction="vertical" style={{ width: "100%" }}>
                {(formData as any)[field].map((val: string, i: number) => (
                  <Input
                    key={i}
                    placeholder={`Enter ${field}`}
                    value={val}
                    onChange={(e) => handleChange(e, field, i)}
                  />
                ))}
                <Button
                  type="dashed"
                  onClick={() => addArrayField(field)}
                  block
                >
                  + Add {field}
                </Button>
              </Space>
            </Form.Item>
          ))}

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Submit Design
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </>
  );
}
