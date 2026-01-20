import React, { useState } from "react";
import { Button, Card, Input, Form, Typography, Space, Divider, message } from "antd";
import AxiosConfig from "../Context/AxiosConfig";
import SidebarOFADmin from "../components/SidebarOFADmin";

const { Title } = Typography;
const { TextArea } = Input;

export default function DesignForm() {
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    DesignID:0,
    Design_Name: "",
    Design_Image: [],
    Design_Description: "",
    Categories: [],
    Design_Colors: [],
    Design_BlogPosts: [],
    Design_Sizes: [],
  });

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "InnovistaImage");
    data.append("cloud_name", "dqabfysqj");

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dqabfysqj/image/upload",
        {
          method: "POST",
          body: data,
        }
      );

      const result = await res.json();
      if (!result.secure_url) {
        alert("Upload failed");
        return;
      }

      setFormData((prev) => ({
        ...prev,
        Design_Image: [...prev.Design_Image, result.secure_url],
      }));
    } catch (error) {
      alert("Upload error");
    }
  };

  const handleDeleteImage = (index) => {
    const updated = [...formData.Design_Image];
    updated.splice(index, 1);
    setFormData({ ...formData, Design_Image: updated });
  };

  const handleChange = (e, field, index) => {
    if (index !== undefined) {
      const arr = [...formData[field]];
      arr[index] = e.target.value;
      setFormData({ ...formData, [field]: arr });
    } else {
      setFormData({ ...formData, [field]: e.target.value });
    }
  };

  const addArrayField = (field) => {
    setFormData({ ...formData, [field]: [...formData[field], ""] });
  };

  const handleSubmit = async () => {
    console.log(formData);
    try {
      await AxiosConfig.post("/designs/create", formData);
      setSubmitted(true);
      setFormData({
        DesignID:0,
        Design_Name: "",
        Design_Image: [],
        Design_Description: "",
        Categories: [],
        Design_Colors: [],
        Design_BlogPosts: [],
        Design_Sizes: [],
      });
    } catch  {
       message.error("Error submitting design.");
    }
  };

  if (submitted) {
    return (
      <Card style={{ maxWidth: 600, margin: "40px auto", textAlign: "center" }}>
        <Title level={3} style={{ color: "green" }}>
          🎉 Design Added Successfully!
        </Title>

        <Button type="primary" onClick={() => setSubmitted(false)}>
          Add Another
        </Button>
      </Card>
    );
  }

  return (
    <>
      <SidebarOFADmin />

      <Card style={{ maxWidth: 650, margin: "40px auto" }}>
        <Title level={3} style={{ textAlign: "center" }}>
          Add New Design
        </Title>
        <Divider />

        <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item label="Design Name">
            <Input
              value={formData.Design_Name}
              onChange={(e) => handleChange(e, "Design_Name")}
            />
          </Form.Item>

          <Form.Item label="Design Description">
            <TextArea
              rows={4}
              value={formData.Design_Description}
              onChange={(e) => handleChange(e, "Design_Description")}
            />
          </Form.Item>

          <Form.Item label="Upload Images">
            <input type="file" onChange={handleImageUpload} />

            <Space direction="vertical" style={{ marginTop: 10 }}>
              {formData.Design_Image.map((img, i) => (
                <div key={i} style={{ position: "relative" }}>
                  <img
                    src={img}
                    alt="Preview"
                    style={{
                      width: 120,
                      borderRadius: 8,
                      border: "1px solid #ddd",
                    }}
                  />
                  <Button
                    danger
                    type="primary"
                    size="small"
                    style={{
                      position: "absolute",
                      top: 5,
                      right: 5,
                    }}
                    onClick={() => handleDeleteImage(i)}
                  >
                    X
                  </Button>
                </div>
              ))}
            </Space>
          </Form.Item>

          {[
            "Categories",
            "Design_Colors",
            "Design_BlogPosts",
            "Design_Sizes",
          ].map((field) => (
            <Form.Item key={field} label={field.replace(/_/g, " ")}>
              <Space direction="vertical" style={{ width: "100%" }}>
                {formData[field].map((val, i) => (
                  <Input
                    key={i}
                    value={val}
                    placeholder={`Enter ${field}`}
                    onChange={(e) => handleChange(e, field, i)}
                  />
                ))}

                <Button
                  type="dashed"
                  block
                  onClick={() => addArrayField(field)}
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
